import { RequestController } from "@/database/controllers/request/request.controller";
import RequestCard from "@/components/requests/RequestCard";
import type { SelectedRequest } from "@/database/controllers/request/request.dto";
import { REQUEST_STATUS_ENUM } from "@/database/controllers/request/request.dto";
import { ModalParent } from "@/components/ModalParent";
import RequestCreator from "@/components/requests/RequestCreator";
import { ObjectController } from "@/database/controllers/object/object.controller";
import { EmployeeController } from "@/database/controllers/employee/employee.controller";

/* eslint-disable eqeqeq */
interface Props {
  focusOn?: number;
}

export default async function RequestBoard({ focusOn }: Props) {
  const statuses = Object.values(REQUEST_STATUS_ENUM) as string[];

  const fetchRequests = async () => {
    return await Promise.all(
      statuses.map((status) => RequestController.getRequestsByStatus(status)),
    );
  };

  const requestsByStatus = await fetchRequests();
  return (
    <div className="flex flex-row p-5 bg-base-200">
      <ModalParent
        className="fixed btn btn-primary z-40 right-14 text-2xl"
        buttonText="＋"
      >
        <RequestCreator
          createAction={RequestController.createRequestAction}
          className=""
          objects={await ObjectController.getObjects()}
          employees={await EmployeeController.getEmployees()}
        />
      </ModalParent>
      {requestsByStatus.map((requests, index) => (
        <div
          key={statuses[index]}
          className="card min-w-96 bg-base-300 shadow-xl m-5 shrink-0"
        >
          <div className="card-body items-center">
            <h2 className="card-title mb-5">{statuses[index]}</h2>
            {requests.map((request: SelectedRequest) => (
              <RequestCard
                className=""
                key={request.id}
                request={request}
                focus={focusOn == request.id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
