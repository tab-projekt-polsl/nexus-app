import Activity from "@/database/models/activity";
import type {
  ACTIVITY_STATUS_ENUM,
  ACTIVITY_TYPE_ENUM,
  CreateActivityDTO,
  SelectedActivity,
} from "./activity.dto";
import { revalidatePath } from "next/cache";
import { EmployeeController } from "@/database/controllers/employee/employee.controller";
import { RequestController } from "@/database/controllers/request/request.controller";

// Makes me do a module and then doesn't like the module either >:(
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ActivityController {
  import getEmployee = EmployeeController.getEmployee;

  /**
   * @example
   * ActivityController.createActivity({
   * sequenceNum: 1,
   * description: "First activity",
   * result: true,
   * status: ACTIVITY_STATUS_ENUM.DONE,
   * dateReg: new Date(),
   * dateFinCancel: new Date(),
   * actType: ACTIVITY_TYPE_ENUM.ACTIVITY_TYPE,
   * });
   *
   * @param activityInfo information about the activity
   * @returns newly created activity
   */
  export async function createActivity(
    activityInfo: CreateActivityDTO,
  ): Promise<Activity> {
    "use server";
    if (!activityInfo) {
      throw new Error("Activity info is required");
    }
    return Activity.create({
      sequenceNum: activityInfo.sequenceNum,
      description: activityInfo.description,
      result: activityInfo.result,
      status: activityInfo.status,
      dateReg: activityInfo.dateReg,
      dateFinCancel: activityInfo.dateFinCancel,
      actType: activityInfo.actType,
      requestId: activityInfo.requestId,
      employeeId: activityInfo.employeeId,
    });
  }
  export async function createActivityAction(formData: FormData) {
    "use server";
    await createActivity({
      sequenceNum: parseInt(formData.get("sequenceNum") as string, 10),
      description: formData.get("description") as string,
      result: formData.get("result") !== "0",
      status: formData.get("status") as ACTIVITY_STATUS_ENUM,
      dateReg: new Date(formData.get("dateReg") as string),
      dateFinCancel: new Date(formData.get("dateFinCancel") as string),
      actType: formData.get("actType") as ACTIVITY_TYPE_ENUM,
      requestId: parseInt(formData.get("requestId") as string, 10),
      employeeId: parseInt(formData.get("employeeId") as string, 10),
    });
    revalidatePath(`/requests/board`);
  }

  export async function updateActivity(
    id: number,
    field: keyof CreateActivityDTO,
    value: any,
  ): Promise<[affectedCount: number]> {
    "use server";
    return Activity.update(
      { [field]: value },
      {
        where: {
          id,
        },
      },
    );
  }

  export async function updateActivityAction(formData: FormData) {
    "use server";
    const response = updateActivity(
      parseInt(formData.get("id") as string, 10),
      formData.get("field") as keyof CreateActivityDTO,
      formData.get("value"),
    );
    console.log(formData.get("value"));
    revalidatePath(`/activities/board`);
    return response;
  }

  export async function getActivitiesByEmployeeId(
    id: number,
  ): Promise<SelectedActivity[]> {
    return (
      await Activity.findAll({
        where: {
          employeeId: id,
        },
      })
    ).map((activity) => activity.toJSON());
  }

  export async function getEmployeeByActivityId(id: number) {
    return Activity.findOne({
      where: {
        id,
      },
    }).then(async (activity) => {
      if (!activity) {
        throw new Error("Activity not found");
      }
      return await getEmployee(activity.getDataValue("employeeId"));
    });
  }

  export async function getRequestByActivityId(id: number) {
    const activity = await Activity.findOne({
      where: {
        id,
      },
    });

    if (!activity) {
      throw new Error("Activity not found");
    }
    return RequestController.getRequest(activity.getDataValue("requestId"));
  }

  /**
   *
   * @param id id to delete
   * @returns number of affected rows
   */
  export function deleteActivity(id: number): Promise<number> {
    return Activity.destroy({
      where: {
        id,
      },
    });
  }

  export function obliterate(): void {
    Activity.destroy({
      where: {},
    });
  }

  /**
   * @example
   * ActivityController.getActivity("id", 2).then((activities) => {
   * console.log(activities);
   * });
   *
   * @param getBy select by id or sequence number
   * @param value value to select by
   * @returns found activity
   */
  export function getActivity(
    getBy: "id" | "seqenceNum",
    value: number,
  ): Promise<SelectedActivity> {
    return Activity.findOne({
      where: {
        [getBy]: value,
      },
    }).then((activity) => {
      if (!activity) {
        throw new Error("Activity not found");
      }
      return activity.toJSON();
    });
  }

  /**
   * @example
   * ActivityController.getActivies().then((activities) => {
   * console.log(activities);
   * });
   *
   * @returns found activities
   */
  export async function getActivities(): Promise<SelectedActivity[]> {
    return (await Activity.findAll()).map((activity) => activity.toJSON());
  }

  /**
   * @example
   * ActivityController.getActivitiesByRequestId(2).then((activities) => {
   * console.log(activities);
   * });
   *
   * @param requestId
   * @returns found activities
   */
  export async function getActivitiesByRequestId(
    requestId: number,
  ): Promise<SelectedActivity[]> {
    return (
      await Activity.findAll({
        where: {
          requestId: requestId,
        },
      })
    ).map((activity) => activity.toJSON());
  }

  /**
   * @example
   * ActivityController.getActivityByStatus("TODO").then((activities) => {
   * console.log(activiteis);
   * });
   *
   * @returns found activities
   */
  export async function getActivitiesByStatus(
    status: string,
  ): Promise<SelectedActivity[]> {
    return (
      await Activity.findAll({
        where: {
          status: status,
        },
      })
    ).map((activity) => activity.toJSON());
  }
}
