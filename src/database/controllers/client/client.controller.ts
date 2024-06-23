// Makes me do a module and then doesn't like the module either >:(

import Client from "@/database/models/client";
import type { CreateClientDTO, SelectedClient } from "./client.dto";
import { SelectedRequest } from "../request/request.dto";
import { ObjectController } from "../object/object.controller";
import { RequestController } from "../request/request.controller";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ClientController {
  export async function createClient(
    clientInfo: CreateClientDTO,
  ): Promise<Client> {
    if (!clientInfo) {
      throw new Error("Client info is required");
    }
    return Client.create({
      name: clientInfo.name,
      fname: clientInfo.fname,
      lname: clientInfo.lname,
      tel: clientInfo.tel,
    });
  }

  export async function updateClient(
    id: number,
    field: keyof CreateClientDTO,
    value: any,
  ): Promise<[affectedCount: number]> {
    return Client.update(
      { [field]: value },
      {
        where: {
          id,
        },
      },
    );
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
    });
  }

  export function getClient(id: number): Promise<SelectedClient> {
    return Client.findOne({
      where: {
        id: id,
      },
    }).then((client) => {
      if (!client) {
        throw new Error("Client not found");
      }
      return client.toJSON();
    });
  }

  export async function getClients(): Promise<SelectedClient[]> {
    return (await Client.findAll()).map((client) => client.toJSON());
  }
}
