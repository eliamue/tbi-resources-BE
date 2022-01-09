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
      [value.title, value.category, value.about, value.link, value.logo]
    );
    return new Resources(rows[0]);
  }

  static async getAllResources() {
    const { rows } = await pool.query('SELECT * FROM resources');
    return rows.map((row) => new Resources(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM resources WHERE id=$1', [
      id,
    ]);
    return new Resources(rows[0]);
  }

  static async update(id, { title, category, about, link, logo }) {
    const existingResource = await Resources.getById(id);
    const new_title = title ?? existingResource.title;
    const new_category = category ?? existingResource.category;
    const new_about = about ?? existingResource.about;
    const new_link = link ?? existingResource.link;
    const new_logo = logo ?? existingResource.logo;

    const { rows } = await pool.query(
      'UPDATE resources SET title=$1, category=$2, about=$3, link=$4, logo=$5 WHERE id=$6 RETURNING *',
      [new_title, new_category, new_about, new_link, new_logo, id]
    );
    return new Resources(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM resources WHERE id=$1 RETURNING *',
      [id]
    );
    return new Resources(rows[0]);
  }
}
