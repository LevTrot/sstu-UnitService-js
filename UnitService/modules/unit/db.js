const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
});

exports.getAllUnits = async () => {
    const { rows } = await pool.query('SELECT * FROM unitdb.units ORDER BY id');
    return rows;
};

exports.getUnitById = async (id) => {
    //const { rows: schemaPath } = await pool.query('SHOW search_path'); // отладка через консоль вывода пути
    //console.log('Current search_path:', schemaPath[0].search_path);
    const { rows } = await pool.query('SELECT * FROM unitdb.units WHERE id = $1', [id]);
    return rows[0];
};

exports.createUnit = async ({ name, image_name }) => {
    const { rows } = await pool.query(
        `INSERT INTO unitdb.units (name, image_name, created_at, updated_at)
         VALUES ($1, $2, NOW(), NOW()) RETURNING *`,
        [name, image_name]
    );
    return rows[0];
};

exports.updateUnit = async (id, { name, image_name }) => {
    const { rows } = await pool.query(
        `UPDATE unitdb.units SET name = $1, image_name = $2, updated_at = NOW()
         WHERE id = $3 RETURNING *`,
        [name, image_name, id]
    );
    return rows[0];
};

exports.deleteUnit = async (id) => {
    await pool.query('DELETE FROM unitdb.units WHERE id = $1', [id]);
};

