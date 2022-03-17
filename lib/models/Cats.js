const pool = require('../utils/pool');

module.exports = class Cat {
  id;
  name;
  favorite_treat;
  favorite_toy;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.favorite_treat = row.favorite_treat;
    this.favorite_toy = row.favorite_toy;
  }

  static async insert({ name, favorite_treat, favorite_toy }) {
    const { rows } = await pool.query(
      'INSERT INTO cats(name, favorite_treat, favorite_toy) VALUES ($1, $2, $3) RETURNING *;',
      [name, favorite_treat, favorite_toy]
    );
    return new Cat(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM cats WHERE id=$1', [id]);
    if (!rows[0]) return null;
    return new Cat(rows[0]);
  }
};
