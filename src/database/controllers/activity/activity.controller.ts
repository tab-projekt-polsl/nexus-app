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
    let newSeqNum = 0;
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

  export function getActivitiesByRequestId(
    id: number,
  ): Promise<SelectedActivity[]> {
    return Activity.findAll({
      where: {
        requestId: id,
      },
    }).then((activities) => activities.map((activity) => activity.toJSON()));
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
}
