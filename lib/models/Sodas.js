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
};
