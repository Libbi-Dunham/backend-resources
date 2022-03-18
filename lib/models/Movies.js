const pool = require('../utils/pool');

module.exports = class Movie {
  id;
  title;
  director;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.director = row.director;
  }

  static async insert({ title, director }) {
    const { rows } = await pool.query(
      'INSERT INTO movies(title, director) VALUES ($1, $2)RETURNING *;',
      [title, director]
    );
    return new Movie(rows[0]);
  }
};
