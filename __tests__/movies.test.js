const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { AstPath } = require('prettier');
const Movie = require('../lib/models/Movies');
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

  it('should list a movie by id', async () => {
    const movie = await Movie.insert({
      title: 'pulp fiction',
      director: 'quentin tarantino',
    });
    const res = await request(app).get(`/api/v1/movies/${movie.id}`);
    expect(res.body).toEqual(movie);
  });

  it('should be able to list movies', async () => {
    await Movie.insert({
      title: 'pulp fiction',
      director: 'quentin tarantino',
    });
    const res = await request(app).get('/api/v1/movies');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        title: 'pulp fiction',
        director: 'quentin tarantino',
      },
    ]);
  });
});
