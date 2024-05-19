export enum EMPLOYEE_ROLE {
  MANAGER = "manager",
  WORKER = "worker",
  ADMIN = "admin",
}

export interface CreateAddressDTO {
  city: string;
  street: string;
  homeNumber: string;
  zipCode: string;
}

export interface SelectedAddress extends CreateAddressDTO {
  id: number;
  clientId: number;
}
