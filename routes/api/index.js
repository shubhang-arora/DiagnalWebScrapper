let express = require('express');
let router = express.Router();

let web_scrape_controller = require('../../controller/webScraper.controller');

router.post('/scrape', web_scrape_controller.scrapeURL);

module.exports = router;
