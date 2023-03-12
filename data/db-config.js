const knex = require("knex");
const configs = require("../knexfile");

const environments = process.env.NODE_ENV || "development";

module.exports = knex(configs[environments]);