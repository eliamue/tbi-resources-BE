import pool from '../utils/pool.js';

export default class Resources {
  id;
  title;
  category;
  about;
  link;
  logo;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.category = row.category;
    this.about = row.about;
    this.link = row.link;
    this.logo = row.logo;
  }

  static async createResource(value) {
    const { rows } = await pool.query(
      'INSERT INTO resources (title, category, about, link, logo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        value.title,
        value.category,
        value.about,
        value.link,
        value.logo
      ]
    );
    return new Resources(rows[0]);
  }
}
