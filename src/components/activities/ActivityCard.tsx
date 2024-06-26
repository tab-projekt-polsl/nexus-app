import React from "react";
import type { SelectedActivity } from "@/database/controllers/activity/activity.dto";
import { ACTIVITY_STATUS_ENUM } from "@/database/controllers/activity/activity.dto";
import { ModalParent } from "@/components/ModalParent";
import ActivityDetails from "@/components/activities/ActivityDetails";
import ResultSwitcher from "@/components/ResultSwitcher";
import StatusSwitcher from "@/components/StatusSwitcher";
import { ActivityController } from "@/database/controllers/activity/activity.controller";
import ActivityUpdater from "@/components/activities/ActivityUpdater";
import { RequestController } from "@/database/controllers/request/request.controller";
import  getRequests  = RequestController.getRequests;
import { EmployeeController } from "@/database/controllers/employee/employee.controller";
import getEmployees = EmployeeController.getEmployees;
interface Props {
  activity: SelectedActivity;
  className: string;
  focus?: boolean;
}

export default async function ActivityCard({ activity, className, focus }: Props) {
  const statusCarousel = [
    ACTIVITY_STATUS_ENUM.TODO,
    ACTIVITY_STATUS_ENUM.IN_PROGRESS,
    ACTIVITY_STATUS_ENUM.QA,
    ACTIVITY_STATUS_ENUM.DONE,
  ];
  return (
    <div
      className={
        "transition-all ease-in-out card w-72 mb-3 bg-base-100 shadow-l hover:shadow-2xl " +
        className
      }
    >
      <div className="card-body flex-1 flex-row justify-between">
        <div className="flex-col">
          <h2 className="card-title">A-{activity.id}</h2>
          <p className="truncate w-36">{activity.description}</p>
        </div>
        <ModalParent
          buttonText="Edit"
          className="transition-all ease-in-out group-hover:opacity-100 text-gray-500"
        >
          <ActivityUpdater
            updateAction={RequestController.upDateRequestAction}
            activity={activity}
            requests={await getRequests()}
            employees={await getEmployees()}
          />
        </ModalParent>
      </div>
      <div className="card-actions justify-center mb-5">
        <ResultSwitcher
          updateAction={ActivityController.updateActivityAction}
          item={activity}
        />
        <StatusSwitcher
          updateAction={ActivityController.updateActivityAction}
          array={statusCarousel}
          item={activity}
          direction={false}
        />
        <StatusSwitcher
          updateAction={ActivityController.updateActivityAction}
          array={statusCarousel}
          item={activity}
          direction={true}
        />
        <ModalParent
          buttonText="Details"
          className="btn btn-ghost"
          initialState={focus}
        >
          <ActivityDetails activityId={activity.id} />
        </ModalParent>
      </div>
    </div>
  );
}
