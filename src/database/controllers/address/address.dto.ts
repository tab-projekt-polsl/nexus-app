export interface CreateAddressDTO {
  city: string;
  street: string;
  homeNumber: string;
  zipCode: string;
  clientId: number;
}

export interface SelectedAddress extends CreateAddressDTO {
  id: number;
}
