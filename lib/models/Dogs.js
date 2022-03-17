const pool = require('../utils/pool');

module.exports = class Dog {
  id;
  name;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.quantity = row.quantity;
  }

  static async insert({ name, quantity }) {
    const { rows } = await pool.query(
      'INSERT INTO dogs(name, quantity) VALUES ($1, $2) RETURNING *;',
      [name, quantity]
    );
    return new Dog(rows[0]);
  }
};
