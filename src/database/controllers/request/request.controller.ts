// Makes me do a module and then doesn't like the module either >:(
import Request from "@/database/models/request";
import type { CreateRequestDTO, SelectedRequest } from "./request.dto";

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
    });
  }

  export function updateRequest(): void {
    console.log("Updating activity");
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
  export function getRequest(id: number): Promise<SelectedRequest> {
    return Request.findOne({
      where: {
        id: id,
      },
    }).then((activity) => {
      if (!activity) {
        throw new Error("Request not found");
      }
      return activity.toJSON();
    });
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
}
