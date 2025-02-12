import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import Address from "./address";
import DbObject from "./object";

export default class Client extends Model {}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
  },
  { sequelize, modelName: "client" },
);

// define associations
Client.hasOne(Address, {
  onDelete: "CASCADE",
});
Address.belongsTo(Client);

Client.hasMany(DbObject, {
  foreignKey: "clientId",
});
DbObject.belongsTo(Client);
