import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import Request from "./request";
import { OBJECT_TYPE_ENUM } from "../controllers/object/object.dto";

export default class DbObject extends Model {}

DbObject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    objectType: {
      // TODO: come up with enum values
      // chance that it's supposed to be a table, not enum
      type: DataTypes.ENUM(...(Object.values(OBJECT_TYPE_ENUM) as string[])),
    },
  },
  { sequelize, modelName: "object" },
);

// define associations
DbObject.hasMany(Request, {
  onDelete: "CASCADE",
});
Request.belongsTo(DbObject);
