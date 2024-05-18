import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import Request from "./request";

export default class Object extends Model {}

Object.init(
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
        objType: {
            // TODO: come up with enum values
            // chance that it's supposed to be a table, not enum
            type: DataTypes.ENUM('obj1', 'obj2', 'obj3')
        },
    },
    { sequelize, modelName: 'object'},
);


// define associations
Object.hasMany(Request, {
    onDelete: 'CASCADE',
});
Request.belongsTo(Object);