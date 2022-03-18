const pool = require('../utils/pool');

module.exports = class Soda {
  id;
  name;
  brand;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.brand = row.brand;
  }

  static async insert({ name, brand }) {
    const { rows } = await pool.query(
      'INSERT INTO sodas(name, brand) VALUES ($1, $2) RETURNING *;',
      [name, brand]
    );
    return new Soda(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM sodas WHERE id=$1', [id]);

    if (!rows[0]) return null;
    return new Soda(rows[0]);
  }
};
