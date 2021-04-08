const request = require('supertest');

const server = 'http://localhost:3000';
// const db = require('../server/db/markets.js');

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('routes', () => {
    describe('POST', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .post('/signup')
          .send({"username": "985", "password": "password"})
          .expect('Content-Type', /application\/json/)
          .expect(200)
          // .then((response) => {
          //   expect(JSON.parse(response)).toBe('emilyccc');
          // });
      });

      // For this test, you'll need to inspect the body of the response and
      // ensure it contains the markets list. Check the markets.dev.json file
      // in the dev database to get an idea of what shape you're expecting.
      // it('markets from "DB" json are in body of response', () => {
      //   return request(server)
      //     .get('/markets')
      //     .expect(db.find())
      //     .expect(200)
      // });
    });

    describe('POST /search', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .post('/search')
          .send({"updatedString": "dune"})
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });

    describe('POST /login', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .post('/login')
          .send({"Username:": "dune", "Password": "hello"})
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });

  //     it('responds with the updated market list', () => {
  //       return request(server)
  //         .put('/markets')
  //         .send([{ location: 'test', cards: 1 }])
  //         .then(res => {
  //           expect(res.body).toEqual([{ location: 'test', cards: 1 }])
  //         })
  //     });

  //     it('responds to invalid request with 400 status and error message in body', () => {
  //       return request(server)
  //         .put('/markets')
  //         .send([{}])
  //         .expect(400)
  //         .then(res => {
  //           expect(res.error).toBeInstanceOf(Error);
  //         })
  //     });
  //   });
  });
});
