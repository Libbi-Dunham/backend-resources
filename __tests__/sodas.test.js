const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Soda = require('../lib/models/Sodas');

describe('backend-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a soda', async () => {
    const res = await request(app)
      .post('/api/v1/sodas')
      .send({ name: 'apple fanta', brand: 'fanta' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'apple fanta',
      brand: 'fanta',
    });
  });

  it('should list a toy by id', async () => {
    const soda = await Soda.insert({ name: 'apple fanta', brand: 'fanta' });
    const res = await request(app).get(`/api/v1/sodas/${soda.id}`);
    expect(res.body).toEqual(soda);
  });
});
