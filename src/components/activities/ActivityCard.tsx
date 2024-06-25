import React from "react";
import type { SelectedActivity } from "@/database/controllers/activity/activity.dto";
import { BsCheckCircleFill, BsClockFill } from "react-icons/bs";
import { ModalParent } from "@/components/ModalParent";
import ActivityDetails from "@/components/activities/ActivityDetails";

interface Props {
  activity: SelectedActivity;
  className: string;
  focus?: boolean;
}

export default function ActivityCard({ activity, className, focus }: Props){
  return (
    <div
      className={
        "transition-all ease-in-out card w-64 bg-base-100 shadow-l hover:shadow-2xl " +
        className
      }
    >
      <div className="card-body flex-1 flex-row justify-between">
        <div className="flex-col">
          <h2 className="card-title">A-{activity.id}</h2>
          <p className="truncate w-36">{activity.description}</p>
        </div>
      </div>
      <div className="card-actions justify-end mb-5 mr-5">
        <div className="self-center flex-wrap mr-3">
          {activity.result ? (
            <BsCheckCircleFill className="fill-green-600" />
          ) : (
            <BsClockFill className="fill-slate-600" />
          )}
        </div>
        <ModalParent
          buttonText="Details"
          className="btn btn-primary"
          initialState={focus}
        >
          <ActivityDetails activityId={activity.id} />
        </ModalParent>
      </div>
    </div>
  );
}