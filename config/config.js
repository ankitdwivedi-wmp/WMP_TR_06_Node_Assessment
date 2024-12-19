require('dotenv').config();

module.exports = {
  development: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.db_host,
    dialect: "postgres",
  },
  test: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.db_host,
    dialect: "postgres",
  },
  production: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.db_host,
    dialect: "postgres",
  },
};
