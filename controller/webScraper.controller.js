const request = require('request');
const cheerio = require('cheerio');
module.exports = {
  scrapeURL: async function (req, res) {
    const pageUrl = req.body.url;
    if (pageUrl) {
      // Loading html
      request({ url: pageUrl, gzip: true }, function (error, response, html) {
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

          return res.status(200).json(metaData);
        }
      });
    } else {
      return res.status(400).json({ message: 'bad request' });
    }
  },
};
