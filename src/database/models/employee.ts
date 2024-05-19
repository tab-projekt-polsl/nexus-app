import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import Request from "./request";
import Activity from "./activity";
import { EMPLOYEE_ROLE } from "../controllers/employee/employee.dto";

export default class Employee extends Model {}

Employee.init(
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
    role: {
      // TODO: check if proper enum values
      type: DataTypes.ENUM(...Object.values(EMPLOYEE_ROLE)),
    },
    uname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "employee" },
);

// define associations
Employee.hasMany(Activity, {
  onDelete: "SET NULL",
});
Activity.belongsTo(Employee);

Employee.hasMany(Request, {
  onDelete: "SET NULL",
});
Request.belongsTo(Employee);
