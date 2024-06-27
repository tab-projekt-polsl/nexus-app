export interface CreateClientDTO {
  // name: string;
  fname: string;
  lname: string;
  tel: number;
  addressId: number;
}

export enum CLIENT_FIELDS {
  // NAME = "name",
  FNAME = "fname",
  LNAME = "lname",
  TEL = "tel",
  ADDRESS_ID = "addressId",
}

export interface SelectedClient extends CreateClientDTO {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
