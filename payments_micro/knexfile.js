const config = require('config');

if (process.env.DOCKER === 'isTrue') {
	module.exports = {
    "client": "postgresql",
    "connection": {
      "database": "thesis",
      "user": "postgres",
      "password": "postgres",
      "host": "dbpayments",
      "port": 5433
    },
    "pool": {
      "min": 1,
      "max": 2
    },
    "migrations": {
      "tableName": "knex_migrations",
      "directory": "db/migrations"
    },
    "seeds": {
      "directory": "db/seeds"
    }
  };
} else {
	module.exports = config['knex'];
}