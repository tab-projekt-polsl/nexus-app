// Makes me do a module and then doesn't like the module either >:(

import Activity from "@/database/models/activity";
import type { CreateActivityDTO, SelectedActivity } from "./activity.dto";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ActivityController {
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

  export function updateActivity(): void {
    console.log("Updating activity");
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
