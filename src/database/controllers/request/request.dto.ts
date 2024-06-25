export enum REQUEST_STATUS_ENUM {
  TODO = "TODO",
  IN_PROGRESS = "In progress",
  QA = "QA",
  DONE = "Done",
}

export enum REQUEST_TYPE_ENUM {
  REQUEST_TYPE = "activity types",
}

export interface CreateRequestDTO {
  description: string;
  result: boolean;
  status: REQUEST_STATUS_ENUM;
  dateReg: Date;
  dateFinCancel: Date;
  objectId: number;
  employeeId: number;
}

export enum REQUEST_FIELDS {
  DESCRIPTION = "description",
  RESULT = "result",
  STATUS = "status",
  DATE_REG = "dateReg",
  DATE_FIN_CANCEL = "dateFinCancel",
  OBJECT_ID = "objectId",
  EMPLOYEE_ID = "employeeId",
}

export interface SelectedRequest extends CreateRequestDTO {
  id: number;
}
