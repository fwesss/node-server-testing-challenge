module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './company.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
      },
    },
  },
}
