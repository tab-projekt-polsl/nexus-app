import { RequestController } from "@/database/controllers/request/request.controller";
import { REQUEST_STATUS_ENUM } from "@/database/controllers/request/request.dto";
import { ActivityController } from "@/database/controllers/activity/activity.controller";
import getActivitiesByRequestId = ActivityController.getActivitiesByRequestId;
import { RouteModal } from "@/components/RouteModal";
import Link from "next/link";
import InnerButton from "@/components/InnerButton";

interface Props {
  requestId: number;
}
export default async function RequestDetails({ requestId }: Props) {
  const [request] = await Promise.all([
    RequestController.getRequest(params.requestId),
  ]);

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
        <div className="card-actions justify-center self-end">
          {activities.length > 0 ? "Activities:" : ""}
          {activities.map((activity, index) => (
            <InnerButton
              key={index}
              className=""
              href={`/activities/${activity.id}`}
              buttonText={`A-${activity.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
