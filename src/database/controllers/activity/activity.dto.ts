export enum ACTIVITY_STATUS_ENUM {
  TODO = "TODO",
  IN_PROGRESS = "In progress",
  QA = "QA",
  DONE = "Done",
}

export enum ACTIVITY_TYPE_ENUM {
  ACTIVITY_TYPE = "activity types",
}

export interface CreateActivityDTO {
  // sequenceNum: number;
  description: string;
  result: boolean;
  status: ACTIVITY_STATUS_ENUM;
  dateReg: Date;
  dateFinCancel: Date;
  actType: ACTIVITY_TYPE_ENUM;
  requestId: number;
  employeeId: number;
}

export interface SelectedActivity extends CreateActivityDTO {
  id: number;
  sequenceNum: number;
  requestId: number;
  employeeId: number;
}
