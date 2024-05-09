import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

class Client extends Model {}

Client.init(
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
        }
    },
    { sequelize },  // TODO: check if connection was successfull
);