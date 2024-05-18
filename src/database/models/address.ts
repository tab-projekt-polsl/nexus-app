import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

export default class Address extends Model {}

Address.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        city: {
            type: DataTypes.STRING,
        },
        street: {
            type: DataTypes.STRING,
        },
        homeNumber: {
            type: DataTypes.STRING,
        },
        zipCode: {
            type: DataTypes.STRING,
        }
    },
    { sequelize, modelName: 'address' },
);