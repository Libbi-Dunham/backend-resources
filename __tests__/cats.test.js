const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a cat', async () => {
    const res = await request(app)
      .post('/api/v1/cats')
      .send({ name: 'tiger', favorite_treat: 'fish', favorite_toy: 'lazer' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'tiger',
      favorite_treat: 'fish',
      favorite_toy: 'lazer',
    });
  });
});
