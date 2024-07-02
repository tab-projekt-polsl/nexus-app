// Makes me do a module and then doesn't like the module either >:(
import Request from "@/database/models/request";
import type {
  CreateRequestDTO,
  REQUEST_STATUS_ENUM,
  SelectedRequest,
} from "./request.dto";
import { REQUEST_FIELDS } from "./request.dto";
import { ClientController } from "../client/client.controller";
import { ObjectController } from "../object/object.controller";
import type { SelectedClient } from "../client/client.dto";
import { revalidatePath } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RequestController {
  export async function createRequest(
    requestInfo: CreateRequestDTO,
  ): Promise<Request> {
    "use server";
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

  export async function createRequestAction(formData: FormData) {
    "use server";

    await createRequest({
      description: formData.get("description") as string,
      result: formData.get("result") !== "0",
      status: formData.get("status") as REQUEST_STATUS_ENUM,
      dateReg: new Date(formData.get("dateReg") as string),
      dateFinCancel: new Date(formData.get("dateFinCancel") as string),
      objectId: parseInt(formData.get("objectId") as string, 10),
      employeeId: parseInt(formData.get("employeeId") as string, 10),
    });
    revalidatePath(`/requests/board`);
  }

  export async function updateRequest(
    id: any,
    field: any,
    value: any,
  ): Promise<[affectedCount: number]> {
    "use server";
    return Request.update(
      { [field]: value },
      {
        where: {
          id,
        },
      },
    );
  }

  export async function updateRequestAction(formData: FormData) {
    "use server";
    const fields = Object.values(REQUEST_FIELDS) as string[];
    for (const field of fields) {
      if (formData.get(field)) {
        await updateRequest(formData.get("id"), field, formData.get(field));
      }
    }
    revalidatePath(`/requests/board`);
    return true;
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
    const request = await Request.findOne({
      where: {
        id: id,
      },
    });
    if (!request) {
      throw new Error("Request not found");
    }
    return request.toJSON();
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
    ).map((request) => request.toJSON());
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

  export async function getObjectByRequestId(id: number): Promise<any> {
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

    return ObjectController.getObject(objectId);
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
    return (await Request.findAll()).map((request) => request.toJSON());
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
    ).map((request) => request.toJSON());
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
    ).map((request) => request.toJSON());
  }
}
