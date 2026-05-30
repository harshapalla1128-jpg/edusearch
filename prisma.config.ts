require("dotenv").config();
const path = require("path");

module.exports = {
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: process.env.DATABASE_URL,
  },
};