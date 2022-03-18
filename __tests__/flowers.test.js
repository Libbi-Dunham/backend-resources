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

  it('should create a flower', async () => {
    const res = await request(app)
      .post('/api/v1/flowers')
      .send({ name: 'rose', color: 'pink' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'rose',
      color: 'pink',
    });
  });
});
