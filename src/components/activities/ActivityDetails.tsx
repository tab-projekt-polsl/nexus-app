import { ActivityController } from "@/database/controllers/activity/activity.controller";
import { ACTIVITY_STATUS_ENUM } from "@/database/controllers/activity/activity.dto";
import Link from "next/link";
import moment from "moment";

interface Props{
  activityId: number;
}

export default async function ActivityDetails({ activityId }: Props) {
  const [activity] = await Promise.all([
    ActivityController.getActivity("id",activityId),
  ]);


  const dateFinCancel = moment(activity.dateFinCancel).format("DD-MM-YYYY");
  const dateReg = moment(activity.dateReg).format("DD-MM-YYYY");


  const badgeType = () => {
    const status = activity.status;
    if (status === ACTIVITY_STATUS_ENUM.DONE) {
      return "badge-success";
    } else if (status === ACTIVITY_STATUS_ENUM.IN_PROGRESS) {
      return "badge-warning";
    } else if (status === ACTIVITY_STATUS_ENUM.QA) {
      return "badge-info";
    }
  };

  return(
    <div className=" bg-base-100 h-full">
         <div className="card-body h-full">
         <h2 className="card-title">
          A-{activity.id}
          <div className={"badge " + badgeType()}>{activity.status}</div>
        </h2>
        <p>{activity.description}</p>
        <p>Sequence: {activity.sequenceNum}</p>
        <p>Employee Id: {activity.employeeId}</p>
        <p>Registered: {dateReg === "Invalid date" ? "-" : dateReg}</p>
        <p>
          Finalized/cancelled:{" "}
          {dateFinCancel === "Invalid date" ? "-" : dateFinCancel}
        </p>
         </div>
    </div>
  );



}