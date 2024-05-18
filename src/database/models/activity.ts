import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import {
  ACTIVITY_STATUS_ENUM,
  ACTIVITY_TYPE_ENUM,
} from "../controllers/activity/activity.dto";

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
      type: DataTypes.ENUM(
        ...(Object.values(ACTIVITY_STATUS_ENUM) as string[]),
      ),
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
      type: DataTypes.ENUM(...(Object.values(ACTIVITY_TYPE_ENUM) as string[])),
    },
    requestId: {
      type: DataTypes.INTEGER,
      references: {
        model: "requests",
        key: "id",
      },
    },
  },
  { sequelize, modelName: "activity" },
);
