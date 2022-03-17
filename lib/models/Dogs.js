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

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM dogs WHERE id=$1', [id]);

    if (!rows[0]) return null;
    return new Dog(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM dogs;');
    return rows.map((row) => new Dog(row));
  }

  static async updateById(id, { name, quantity }) {
    const existingDog = await Dog.getById(id);

    if (!existingDog) return null;

    const newName = name ?? existingDog.name;
    const newQuantity = quantity ?? existingDog.quantity;

    const { rows } = await pool.query(
      'UPDATE dogs SET name=$2, quantity=$3 WHERE id=$1 RETURNING *;',
      [id, newName, newQuantity]
    );
    return new Dog(rows[0]);
  }
};
