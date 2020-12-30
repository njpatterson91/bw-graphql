const sharedConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: { directory: "./data/migrations" },
  pool: {
    afterCreate: (conn, done) => conn.run("PRAGMA foreign_keys = ON", done),
  },
};

module.exports = {
  development: {
    client: "pg",
    connection:
      "postgres://hykcccgn:zkUqTNzcnQld5S1IucgYOdhGWWGNVzRe@suleiman.db.elephantsql.com:5432/hykcccgn",
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: "./data/test.db3" },
  },
  production: {
    client: "pg",
    connection:
      "postgres://hykcccgn:zkUqTNzcnQld5S1IucgYOdhGWWGNVzRe@suleiman.db.elephantsql.com:5432/hykcccgn",
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
};
