import { Sequelize } from 'sequelize';

const sequelize: Sequelize = new Sequelize('nexus', 'nexus', 'nexus', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306
});

export default sequelize;

/*
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
*/
