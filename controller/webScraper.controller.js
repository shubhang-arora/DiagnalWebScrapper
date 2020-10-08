const request = require('request');
const cheerio = require('cheerio');
const redis = require('redis');
const redisClient = redis.createClient();

module.exports = {
  scrapeURL: async function (req, res) {
    const pageUrl = req.body.url;
    if (pageUrl) {
      // Checking if results are chached
      redisClient.get(pageUrl, (err, result) => {
        // If not then load html
        if (!result) {
          // Loading html
          request({ url: pageUrl, gzip: true }, function (
            error,
            response,
            html,
          ) {
            if (!error) {
              let $ = cheerio.load(html);

              let meta = $('meta');
              let keys = Object.keys(meta);
              let metaData = {};

              // Mapping over meta keys
              keys.forEach(function (key) {
                // Getting title
                if (
                  meta[key].attribs &&
                  meta[key].attribs.property &&
                  meta[key].attribs.property === 'og:title'
                ) {
                  metaData['title'] = meta[key].attribs.content;
                }
                // Getting description
                else if (
                  meta[key].attribs &&
                  meta[key].attribs.property &&
                  meta[key].attribs.property === 'og:description'
                ) {
                  metaData['description'] = meta[key].attribs.content;
                }
                // Getting images
                else if (
                  meta[key].attribs &&
                  meta[key].attribs.property &&
                  meta[key].attribs.property === 'og:image'
                ) {
                  if (!metaData.images) {
                    metaData['images'] = [];
                  }
                  metaData['images'].push(meta[key].attribs.content);
                }
              });

              // If no og meta tags were present
              if (!metaData.title) {
                metaData['title'] = $('title').text();
              }

              if (!metaData.images) {
                let images = $('img');
                let imageKeys = Object.keys(images);

                imageKeys.forEach((imageKey) => {
                  if (images[imageKey].attribs) {
                    if (!metaData.images) {
                      metaData['images'] = [];
                    }
                    metaData['images'].push(images[imageKey].attribs['src']);
                  }
                });
              }

              redisClient.set(pageUrl, JSON.stringify(metaData), () =>
                console.log('value cached'),
              );
              return res.status(200).json(metaData);
            }
          });
        }
        // Returning cached value
        else {
          return res.status(200).json(JSON.parse(result));
        }
      });
    } else {
      return res.status(400).json({ message: 'bad request' });
    }
  },
};
