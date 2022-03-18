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

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM sodas;');
    return rows.map((row) => new Soda(row));
  }

  static async updateById(id, { name, brand }) {
    const existingSoda = await Soda.getById(id);

    if (!existingSoda) return null;

    const newName = name ?? existingSoda.name;
    const newBrand = brand ?? existingSoda.brand;

    const { rows } = await pool.query(
      'UPDATE sodas SET name=$2, brand=$3 WHERE id=$1 RETURNING *;',
      [id, newName, newBrand]
    );
    return new Soda(rows[0]);
  }
};
