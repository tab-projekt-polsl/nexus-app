export enum ACTIVITY_STATUS_ENUM {
  TODO = "TODO",
  IN_PROGRESS = "In progress",
  QA = "QA",
  DONE = "Done",
}

export enum ACTIVITY_TYPE_ENUM {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface CreateActivityDTO {
  sequenceNum: number;
  description: string;
  result: boolean;
  status: ACTIVITY_STATUS_ENUM;
  dateReg: Date;
  dateFinCancel: Date;
  actType: ACTIVITY_TYPE_ENUM;
  requestId: number;
  employeeId: number;
}

export enum ACTIVITY_FIELDS {
  SEQUENCE_NUM = "sequenceNum",
  DESCRIPTION = "description",
  RESULT = "result",
  STATUS = "status",
  DATE_REG = "dateReg",
  DATE_FIN_CANCEL = "dateFinCancel",
  ACT_TYPE = "actType",
  REQUEST_ID = "requestId",
  EMPLOYEE_ID = "employeeId",
}

export interface SelectedActivity extends CreateActivityDTO {
  id: number;
  requestId: number;
  employeeId: number;
}
