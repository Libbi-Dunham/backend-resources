const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Cat = require('../lib/models/Cats');

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

  it('should list a cat by id', async () => {
    const cat = await Cat.insert({
      name: 'tiger',
      favorite_treat: 'fish',
      favorite_toy: 'lazer',
    });
    const res = await request(app).get(`/api/v1/cats/${cat.id}`);
    expect(res.body).toEqual(cat);
  });

  it('should be able to list cats', async () => {
    await Cat.insert({
      name: 'tiger',
      favorite_treat: 'fish',
      favorite_toy: 'lazer',
    });
    const res = await request(app).get('/api/v1/cats');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        name: 'tiger',
        favorite_treat: 'fish',
        favorite_toy: 'lazer',
      },
    ]);
  });
});
