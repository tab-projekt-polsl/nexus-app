import Address from "@/database/models/address";
import type { CreateAddressDTO, SelectedAddress } from "./address.dto";
import { revalidatePath } from "next/cache";

// Makes me do a module and then doesn't like the module either >:(
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
      clientId: addressInfo.clientId,
    });
  }

  export async function updateAddress(
    id: number,
    field: keyof CreateAddressDTO,
    value: any,
  ): Promise<[affectedCount: number]> {
    "use server";
    return Address.update(
      { [field]: value },
      {
        where: {
          id,
        },
      },
    );
  }

  export async function updateAddressByClientIdAction(
    formData: FormData,
  ): Promise<[affectedCount: number]> {
    "use server";
    const response = Address.update(
      {
        city: formData.get("city"),
        street: formData.get("street"),
        homeNumber: formData.get("homeNumber"),
        zipCode: formData.get("zipCode"),
      },
      {
        where: {
          clientId: formData.get("clientId"),
        },
      },
    );
    revalidatePath(`/management`);
    return response;
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

  export async function getAddressByClientId(
    clientId: number,
  ): Promise<SelectedAddress | null> {
    return await Address.findOne({
      where: {
        clientId: clientId,
      },
    }).then((address) => {
      if (!address) {
        return null;
      }
      return address?.toJSON();
    });
  }

  export async function getAddresses(): Promise<SelectedAddress[]> {
    return (await Address.findAll()).map((employee) => employee.toJSON());
  }
}
