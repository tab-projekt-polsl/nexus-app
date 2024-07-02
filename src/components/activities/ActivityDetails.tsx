import { ActivityController } from "@/database/controllers/activity/activity.controller";
import { ACTIVITY_STATUS_ENUM } from "@/database/controllers/activity/activity.dto";
import Link from "next/link";
import moment from "moment";

interface Props {
  activityId: number;
}

export default async function ActivityDetails({ activityId }: Props) {
  const [activity] = await Promise.all([
    ActivityController.getActivity("id", activityId),
  ]);

  const dateFinCancel = moment(activity.dateFinCancel).format("DD-MM-YYYY");
  const dateReg = moment(activity.dateReg).format("DD-MM-YYYY");
  const employee = await ActivityController.getEmployeeByActivityId(
    activity.id,
  );
  const request = await ActivityController.getRequestByActivityId(activity.id);

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

  return (
    <div className=" bg-base-100 h-full">
      <div className="card-body h-full">
        <h2 className="card-title">
          A-{activity.id}
          <div className={"badge " + badgeType()}>{activity.status}</div>
        </h2>
        <p>{activity.description}</p>
        <p>Registered: {dateReg === "Invalid date" ? "-" : dateReg}</p>
        <p>
          Completion/cancellation:{" "}
          {dateFinCancel === "Invalid date" ? "-" : dateFinCancel}
        </p>
        <p>Activity type: {activity.actType}</p>
        <div>
          {employee ? "Employee:" : ""}
          <Link href={`/management/employee/${employee.id}`}>
            <div className="btn ml-2">
              {employee.fname + " " + employee.lname}
            </div>
          </Link>
        </div>
        <div>
          {request ? "Request:" : ""}
          <Link href={`/requests/board/${request.id}`}>
            <div className="btn ml-2">R-{request.id}</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
