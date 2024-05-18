import { Sequelize } from "sequelize";

const sequelize: Sequelize = new Sequelize("nexus", "nexus", "nexus", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  // For some reason it doesn't work without it *shrug*
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  dialectModule: require("mysql2"),
});

export default sequelize;
