const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const Movie = require('../lib/models/Movies');

describe('backend-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a movie', async () => {
    const res = await request(app)
      .post('/api/v1/movies')
      .send({ title: 'pulp fiction', director: 'quentin tarantino' });

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'pulp fiction',
      director: 'quentin tarantino',
    });
  });
});
