import sequelize from "./connection";

export default async function syncModels() {
  await sequelize.sync({ force: true });
}

syncModels().then();
