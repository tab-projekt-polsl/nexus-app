import { RequestController } from "@/database/controllers/request/request.controller";
import { REQUEST_STATUS_ENUM } from "@/database/controllers/request/request.dto";
import { ActivityController } from "@/database/controllers/activity/activity.controller";
import Link from "next/link";
import moment from "moment";
import getActivitiesByRequestId = ActivityController.getActivitiesByRequestId;

interface Props {
  requestId: number;
}
export default async function RequestDetails({ requestId }: Props) {
  const [request] = await Promise.all([
    RequestController.getRequest(requestId),
  ]);

  const dateFinCancel = moment(request.dateFinCancel).format("DD-MM-YYYY");
  const dateReg = moment(request.dateReg).format("DD-MM-YYYY");
  const client = await RequestController.getClientByRequestId(request.id);
  const object = await RequestController.getObjectByRequestId(request.id);

  const badgeType = () => {
    const status = request.status;
    if (status === REQUEST_STATUS_ENUM.DONE) {
      return "badge-success";
    } else if (status === REQUEST_STATUS_ENUM.IN_PROGRESS) {
      return "badge-warning";
    } else if (status === REQUEST_STATUS_ENUM.QA) {
      return "badge-info";
    }
  };

  const getAssociatedActivities = async (requestId: number) => {
    return await getActivitiesByRequestId(requestId);
  };

  const activities = await getAssociatedActivities(request.id);

  return (
    <div className=" bg-base-100 h-full">
      <div className="card-body h-full">
        <h2 className="card-title">
          R-{request.id}
          <div className={"badge " + badgeType()}>{request.status}</div>
        </h2>
        <p>{request.description}</p>
        <p>Registered: {dateReg === "Invalid date" ? "-" : dateReg}</p>
        <p>
          Completion/cancellation:{" "}
          {dateFinCancel === "Invalid date" ? "-" : dateFinCancel}
        </p>
        <div>
          {client ? "Client:" : ""}
          <div className="btn ml-2">
            <Link href={`/management/client/${client.id}`}>
              {client.fname + " " + client.lname}
            </Link>
          </div>
        </div>
        <div>
          {object ? "Object:" : ""}
          <Link href={`/management/object/${object.id}`}>
            <div className="btn ml-2">{object.name}</div>
          </Link>
        </div>
        <div className="">
          {activities.length > 0 ? "Activities:" : ""}
          {activities.map((activity, index) => (
            <Link key={index} href={`/activities/board/${activity.id}`}>
              <div className="btn ml-2">A-{activity.id}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
