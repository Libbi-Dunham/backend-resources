const pool = require('../utils/pool');

module.exports = class Flower {
  id;
  name;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
  }

  static async insert({ name, color }) {
    const { rows } = await pool.query(
      'INSERT INTO flowers(name, color) VALUES ($1, $2) RETURNING *;',
      [name, color]
    );
    return new Flower(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM flowers WHERE id=$1', [
      id,
    ]);

    if (!rows[0]) return null;
    return new Flower(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM flowers;');
    return rows.map((row) => new Flower(row));
  }
};
