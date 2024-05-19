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

export interface SelectedEmployee extends CreateEmployeeDTO {
  id: number;
}
