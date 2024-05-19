export interface CreateClientDTO {
  name: string;
  fname: string;
  lname: string;
  tel: number;
}

export interface SelectedClient extends CreateClientDTO {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
