const { Pool } = require("pg");
const keys = require("../keys");

const getPostgresClient = () => {
  const config = {
    host: keys.pgHost,
    user: keys.pgUser,
    database: keys.pgDatabaseName,
    password: keys.pgPassword,
    port: keys.pgPort,
  };

  if (process.env.NODE_ENV !== "production") {
    config.ssl = { rejectUnauthorized: false };
  }

  return new Pool(config);
};

const pgClient = getPostgresClient();

pgClient.on("error", () => {
  console.log("Postgres connection lost!!");
});

module.exports = pgClient;
