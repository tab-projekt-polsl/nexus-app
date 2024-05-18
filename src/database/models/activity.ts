import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

export default class Activity extends Model {}

Activity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sequenceNum: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        result: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        status: {
            // TODO: come up with enum values
            type: DataTypes.ENUM('TODO', 'In progress', 'QA', 'Done'),      
        },
        dateReg: {                    
            type: DataTypes.DATE,
        },
        dateFinCancel: {
            type: DataTypes.DATE,
        },
        actType: {
            // TODO: come up with enum values
            // chance that it's supposed to be a table, not enum
            type: DataTypes.ENUM('activity types'), 
        },
    },
    { sequelize, modelName: 'activity'},
);