// Makes me do a module and then doesn't like the module either >:(

import Address from "@/database/models/address";
import type { CreateAddressDTO, SelectedAddress } from "./address.dto";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AddressController {
  export async function createAddress(
    addressInfo: CreateAddressDTO,
  ): Promise<Address> {
    if (!addressInfo) {
      throw new Error("Address info is required");
    }
    return Address.create({
      city: addressInfo.city,
      street: addressInfo.street,
      homeNumber: addressInfo.homeNumber,
      zipCode: addressInfo.zipCode,
    });
  }

  export function updateAddress(): void {
    console.log("Updating activity");
  }

  /**
   *
   * @param id id to delete
   * @returns number of affected rows
   */
  export function deleteAddress(id: number): Promise<number> {
    return Address.destroy({
      where: {
        id,
      },
    });
  }

  export function obliterate(): void {
    Address.destroy({
      where: {},
    });
  }

  export function getAddress(id: number): Promise<SelectedAddress> {
    return Address.findOne({
      where: {
        id: id,
      },
    }).then((employee) => {
      if (!employee) {
        throw new Error("Address not found");
      }
      return employee.toJSON();
    });
  }

  export async function getAddresses(): Promise<SelectedAddress[]> {
    return (await Address.findAll()).map((employee) => employee.toJSON());
  }
}
