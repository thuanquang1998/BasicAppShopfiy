const { Pool } = require('pg')

require('dotenv').config()
const { POSTGRES_USER, POSTGRES_HOST, POSTGRES_DB, POSTGRES_PWD, POSTGRES_PORT } = process.env

const pgConfig = {
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PWD,
  port: POSTGRES_PORT,
}
const pool = new Pool(pgConfig)

/**
 *
 * @param {String} sql_query
 * @returns Object
 */
const query = async (sql_query) => {
  const client = await pool.connect()
  try {
    return await client.query(sql_query)
  } catch (error) {
    throw error
  } finally {
    client.release()
  }
}

module.exports.postgresql = {
  query,
}
