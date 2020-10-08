const app = require('../server/index');
const request = require('supertest');

describe('POST /scrape', function () {
  it('responds with json', function (done) {
    this.timeout(10000);
    request(app)
      .post('/api/scrape')
      .send({
        url:
          'https://www.amazon.com/gp/product/B072JXVTKT?pf_rd_r=Z9HSN4GZNGHR47GJNE47&pf_rd_p=6fc81c8c-2a38-41c6-a68a-f78c79e7253f',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        done();
      });
  });
});
