import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import Activity from "./activity";

export default class Request extends Model {}

Request.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
    },
    { sequelize, modelName: 'request'},
);

// define associations
Request.hasMany(Activity, {
    onDelete: 'CASCADE'
});
Activity.belongsTo(Request);