const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const Dog = require('../lib/models/Dogs');

describe('backend-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a dog', async () => {
    const res = await request(app)
      .post('/api/v1/dogs')
      .send({ name: 'miklo', quantity: 1 });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'miklo',
      quantity: 1,
    });
  });
});
