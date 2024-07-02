import Activity from "@/database/models/activity";
import type {
  ACTIVITY_STATUS_ENUM,
  CreateActivityDTO,
  SelectedActivity,
} from "./activity.dto";
import { ACTIVITY_FIELDS, ACTIVITY_TYPE_ENUM } from "./activity.dto";
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
    let newSeqNum = 1;
    Activity.findAll({ where: { requestId: activityInfo.requestId } }).then(
      (activities) => {
        if (activities.length > 0) {
          newSeqNum = activities.reduce((maxSeqNum, activity) => {
            const newAct = activity.toJSON();
            return newAct.sequenceNum > maxSeqNum
              ? newAct.sequenceNum
              : maxSeqNum;
          }, 0);
          newSeqNum++;
        }
      },
    );
    return Activity.create({
      sequenceNum: newSeqNum,
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
      // sequenceNum: parseInt(formData.get("sequenceNum") as string, 10),
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
    id: any,
    field: any,
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
    const fields = Object.values(ACTIVITY_FIELDS) as string[];
    for (const field of fields) {
      if (formData.get(field)) {
        await updateActivity(formData.get("id"), field, formData.get(field));
      }
    }
    revalidatePath(`/activities/board`);
    return true;
  }

  export async function updateActivityStatus(formData: FormData) {
    "use server";
    await updateActivity(formData.get("id"), "status", formData.get("value"));
    revalidatePath(`/activities/board`);
  }

  export async function updateActivityResult(formData: FormData) {
    "use server";
    await updateActivity(
      formData.get("id"),
      "result",
      formData.get("value") === "1",
    );
    revalidatePath(`/activities/board`);
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

  export function shiftSequenceNumber(
    activityId: number,
    direction: "left" | "right",
  ): void {
    Activity.findOne({
      where: {
        id: activityId,
      },
    }).then((activity) => {
      if (!activity) {
        throw new Error("Activity not found");
      }
      const selectedActivity: SelectedActivity = activity.toJSON();
      const currentSequenceNum = selectedActivity.sequenceNum;

      Activity.findOne({
        where: {
          requestId: selectedActivity.requestId,
          sequenceNum:
            direction === "left"
              ? currentSequenceNum - 1
              : currentSequenceNum + 1,
        },
      }).then((activityToShift) => {
        if (!activityToShift) {
          return;
        }
        activityToShift.set("sequenceNum", currentSequenceNum);
        activity.set(
          "sequenceNum",
          direction === "left"
            ? currentSequenceNum - 1
            : currentSequenceNum + 1,
        );
        activityToShift.save();
        activity.save();
      });
    });
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
   * ActivityController.getActivityTypes().then((types) => {
   * console.log(types);
   * });
   *
   * @returns activity types
   */
  export async function getActivityTypes(): Promise<string[]> {
    return Object.values(ACTIVITY_TYPE_ENUM);
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
