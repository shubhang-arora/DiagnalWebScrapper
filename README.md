# DiagnalWebScrapper

In the project directory, you can run:

### `npm install`

This would install all the dependencies

### `nodemon server/index.js`

Runs the app in the terminal on 5123 port<br />

### `npm test`

Runs the unit test 

## Heroku

The app is deployed on Heroku 

### https://diagnal-scraper.herokuapp.com/api/scrape

# Test curl request

`curl --location --request POST 'https://diagnal-scraper.herokuapp.com/api/scrape' \--header 'Accept: application/json' \--header 'Content-Type: application/x-www-form-urlencoded' \--data-urlencode 'url=https://www.npmjs.com/package/cheerio'`

## Screenshots
![Unit test](https://i.imgur.com/jJDQDLt.png)

![Response](https://i.imgur.com/lGaA699.png)



