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

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM movies WHERE id=$1', [id]);

    if (!rows[0]) return null;
    return new Movie(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM movies;');
    return rows.map((row) => new Movie(row));
  }

  static async updateById(id, { title, director }) {
    const existingMovie = await Movie.getById(id);
    if (!existingMovie) return null;

    const newTitle = title ?? existingMovie.title;
    const newDirector = director ?? existingMovie.director;

    const { rows } = await pool.query(
      'UPDATE movies SET title=$2, director=$3 WHERE id=$1 RETURNING *;',
      [id, newTitle, newDirector]
    );
    return new Movie(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM movies WHERE id=$1 RETURNING *;',
      [id]
    );
    if (!rows[0]) return null;
    return new Movie(rows[0]);
  }
};
