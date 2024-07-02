// Makes me do a module and then doesn't like the module either >:(

import Client from "@/database/models/client";
import type { CreateClientDTO, SelectedClient } from "./client.dto";
import { CLIENT_FIELDS } from "./client.dto";
import type { SelectedRequest } from "../request/request.dto";
import { ObjectController } from "../object/object.controller";
import { RequestController } from "../request/request.controller";
import { AddressController } from "../address/address.controller";
import { revalidatePath } from "next/cache";
import type { SelectedAddress } from "@/database/controllers/address/address.dto";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ClientController {
  export async function createClient(
    clientInfo: CreateClientDTO,
  ): Promise<Client> {
    "use server";
    if (!clientInfo) {
      throw new Error("Client info is required");
    }
    return Client.create({
      // name: clientInfo.name,
      fname: clientInfo.fname,
      lname: clientInfo.lname,
      tel: clientInfo.tel,
    });
  }

  export async function createClientAction(formData: FormData) {
    "use server";
    const response = await createClient({
      fname: formData.get("fname") as string,
      lname: formData.get("lname") as string,
      tel: parseInt(formData.get("tel") as string, 10),
    });
    await AddressController.createAddress({
      city: formData.get("city") as string,
      street: formData.get("street") as string,
      homeNumber: formData.get("homeNumber") as string,
      zipCode: formData.get("zipCode") as string,
      clientId: response.dataValues.id,
    });
    revalidatePath(`/management`);
    return response;
  }

  export async function updateClient(
    id: any,
    field: any,
    value: any,
  ): Promise<[affectedCount: number]> {
    "use server";
    return Client.update(
      { [field]: value },
      {
        where: {
          id,
        },
      },
    );
  }
  // server action with form
  export async function updateClientAction(formData: FormData) {
    "use server";
    const fields = Object.values(CLIENT_FIELDS) as string[];
    for (const field of fields) {
      if (formData.get(field)) {
        await updateClient(formData.get("id"), field, formData.get(field));
      }
    }
    revalidatePath(`/management`);
    return true;
  }

  export async function getRequestsByClientId(
    clientId: number,
  ): Promise<SelectedRequest[]> {
    const objects = await ObjectController.getObjectsByClientId(clientId);
    const requests = await Promise.all(
      objects.map((object) =>
        RequestController.getRequestsByObjectId(object.id),
      ),
    );
    return requests.flat();
  }

  export async function getAddressByClientId(
    clientId: number,
  ): Promise<SelectedAddress | null> {
    return AddressController.getAddressByClientId(clientId);
  }

  /**
   *
   * @param id id to delete
   * @returns number of affected rows
   */
  export function deleteClient(id: number): Promise<number> {
    return Client.destroy({
      where: {
        id,
      },
    });
  }

  export function obliterate(): void {
    Client.destroy({
      where: {},
    }).then();
  }

  export async function getClient(id: number): Promise<SelectedClient> {
    const client = await Client.findOne({
      where: {
        id: id,
      },
    });
    if (!client) {
      throw new Error("Client not found");
    }
    return client.toJSON();
  }

  export async function getClients(): Promise<SelectedClient[]> {
    return (await Client.findAll()).map((client) => client.toJSON());
  }
}
