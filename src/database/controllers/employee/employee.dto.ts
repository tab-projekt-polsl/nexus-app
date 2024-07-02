export enum EMPLOYEE_ROLE {
  MANAGER = "manager",
  WORKER = "worker",
  ADMIN = "admin",
}

export interface CreateEmployeeDTO {
  fname: string;
  lname: string;
  role: EMPLOYEE_ROLE;
  uname: string;
  password: string;
}

export enum EMPLOYEE_FIELDS {
  FNAME = "fname",
  LNAME = "lname",
  ROLE = "role",
  UNAME = "uname",
  PASSWORD = "password",
}

export interface SelectedEmployee extends CreateEmployeeDTO {
  id: number;
}
