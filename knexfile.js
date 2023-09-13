// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      connectionString:
        'postgres://xkmgiqmeqhkwwe:f152290282748d2a00f99cd00291250c6fd4f4c4c51b76c3de99e253e669bd0c@ec2-34-235-108-214.compute-1.amazonaws.com:5432/deldtuvig09lb1',
      ssl: { rejectUnauthorized: false },
      host: 'ec2-34-235-108-214.compute-1.amazonaws.com',
      port: 5432,
      user: 'xkmgiqmeqhkwwe',
      database: 'deldtuvig09lb1',
      password:
        'f152290282748d2a00f99cd00291250c6fd4f4c4c51b76c3de99e253e669bd0c',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
