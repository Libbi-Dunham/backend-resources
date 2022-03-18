const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Flower = require('../lib/models/Flowers');

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

  it('should list a flower by id', async () => {
    const flower = await Flower.insert({ name: 'rose', color: 'pink' });
    const res = await request(app).get(`/api/v1/flowers/${flower.id}`);
    expect(res.body).toEqual(flower);
  });
});
