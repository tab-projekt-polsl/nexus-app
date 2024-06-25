import { ActivityController } from "@/database/controllers/activity/activity.controller";
import ActivityCard from "@/components/activities/ActivityCard";
import type { SelectedActivity } from "@/database/controllers/activity/activity.dto";
import { ACTIVITY_STATUS_ENUM } from "@/database/controllers/activity/activity.dto";
import { ModalParent } from "@/components/ModalParent";
import { RequestController } from "@/database/controllers/request/request.controller";
import { EmployeeController } from "@/database/controllers/employee/employee.controller";
import ActivityForm from "@/components/activities/ActivityForm";

interface Props {
  focusOn?: number;
}

export default async function ActivityBoard({ focusOn }: Props) {
  const statuses = Object.values(ACTIVITY_STATUS_ENUM) as string[];

  const fetchRequests = async () => {
    return await Promise.all(
      statuses.map((status) =>
        ActivityController.getActivitiesByStatus(status),
      ),
    );
  };

  const activitiesByStatus = await fetchRequests();
  return (
    <div className="flex flex-row p-5 bg-base-200">
      <ModalParent
        className="fixed btn btn-primary z-40 right-14 text-2xl"
        buttonText="+"
      >
        <ActivityForm
          createAction={ActivityController.createActivityAction}
          className=""
          requests={await RequestController.getRequests()}
          employees={await EmployeeController.getEmployees()}
        />
      </ModalParent>
      {activitiesByStatus.map((activities, index) => (
        <div
          key={statuses[index]}
          className="card min-w-80 bg-base-300 shadow-xl m-5"
        >
          <div className="card-body items-center">
            <h2 className="card-title mb-5">{statuses[index]}</h2>
            {activities.map((activity: SelectedActivity) => (
              <ActivityCard
                className=""
                key={activity.id}
                activity={activity}
                /* eslint-disable-next-line eqeqeq */
                focus={focusOn == activity.id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
