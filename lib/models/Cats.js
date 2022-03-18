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

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM cats;');
    return rows.map((row) => new Cat(row));
  }

  static async updateById(id, { name, favorite_treat, favorite_toy }) {
    const existingCat = await Cat.getById(id);

    if (!existingCat) return null;

    const newName = name ?? existingCat.name;
    const newFavorite_treat = favorite_treat ?? existingCat.favorite_treat;
    const newFavorite_toy = favorite_toy ?? existingCat.favorite_toy;

    const { rows } = await pool.query(
      'UPDATE cats SET name=$2, favorite_treat=$3, favorite_toy=$4 WHERE id=$1 RETURNING *;',
      [id, newName, newFavorite_treat, newFavorite_toy]
    );
    return new Cat(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM cats WHERE id=$1 RETURNING *;',
      [id]
    );
    if (!rows[0]) return null;
    return new Cat(rows[0]);
  }
};
