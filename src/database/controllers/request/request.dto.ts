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
}

export interface SelectedRequest extends CreateRequestDTO {
  id: number;
  requestId: number;
  employeeId: number;
}
