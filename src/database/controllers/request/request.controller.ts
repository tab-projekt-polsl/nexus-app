// Makes me do a module and then doesn't like the module either >:(
import Request from "@/database/models/request";
import type { CreateRequestDTO, SelectedRequest } from "./request.dto";
import { ClientController } from "../client/client.controller";
import { ObjectController } from "../object/object.controller";
import type { SelectedClient } from "../client/client.dto";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RequestController {
  export async function createRequest(
    requestInfo: CreateRequestDTO,
  ): Promise<Request> {
    if (!requestInfo) {
      throw new Error("Request info is required");
    }
    return Request.create({
      description: requestInfo.description,
      result: requestInfo.result,
      status: requestInfo.status,
      dateReg: requestInfo.dateReg,
      dateFinCancel: requestInfo.dateFinCancel,
      objectId: requestInfo.objectId,
      employeeId: requestInfo.employeeId,
    });
  }

  export async function updateRequest(
    id: number,
    field: keyof CreateRequestDTO,
    value: any,
  ): Promise<[affectedCount: number]> {
    return Request.update(
      { [field]: value },
      {
        where: {
          id,
        },
      },
    );
  }

  /**
   *
   * @param id id to delete
   * @returns number of affected rows
   */
  export function deleteRequest(id: number): Promise<number> {
    return Request.destroy({
      where: {
        id,
      },
    });
  }

  export function obliterate(): void {
    Request.destroy({
      where: {},
    });
  }

  /**
   * @example
   * RequestController.getRequest(2).then((activities) => {
   * console.log(activities);
   * });
   * @param id id to select by
   * @returns found request
   */
  export async function getRequest(id: number): Promise<SelectedRequest> {
    const activity = await Request.findOne({
      where: {
        id: id,
      },
    });
    if (!activity) {
      throw new Error("Request not found");
    }
    return activity.toJSON();
  }

  export async function getRequestsByObjectId(
    id: number,
  ): Promise<SelectedRequest[]> {
    return (
      await Request.findAll({
        where: {
          objectId: id,
        },
      })
    ).map((activity) => activity.toJSON());
  }

  export async function getClientByRequestId(
    id: number,
  ): Promise<SelectedClient> {
    const request = await Request.findOne({
      where: {
        id,
      },
    });
    if (!request) {
      throw new Error("Request not found");
    }

    const objectId: number = request.getDataValue("objectId");
    if (!objectId) {
      throw new Error("Object not found");
    }

    const clientId: number = (await ObjectController.getObject(objectId))
      .clientId;

    if (!clientId) {
      throw new Error("Client not found");
    }

    return ClientController.getClient(clientId);
  }

  /**
   * @example
   * RequestController.getActivies().then((activities) => {
   * console.log(activities);
   * });
   *
   * @returns found activities
   */
  export async function getRequests(): Promise<SelectedRequest[]> {
    return (await Request.findAll()).map((activity) => activity.toJSON());
  }

  /**
   * @example
   * RequestController.getRequestsByStatus("TODO").then((requests) => {
   * console.log(requests);
   * });
   *
   * @returns found requests
   */
  export async function getRequestsByStatus(
    status: string,
  ): Promise<SelectedRequest[]> {
    return (
      await Request.findAll({
        where: {
          status: status,
        },
      })
    ).map((activity) => activity.toJSON());
  }

  export async function getRequestsByEmployeeId(
    id: number,
  ): Promise<SelectedRequest[]> {
    return (
      await Request.findAll({
        where: {
          employeeId: id,
        },
      })
    ).map((activity) => activity.toJSON());
  }
}
