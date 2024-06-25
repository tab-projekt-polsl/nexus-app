import React from "react";
import type { SelectedRequest } from "@/database/controllers/request/request.dto";
import { REQUEST_STATUS_ENUM } from "@/database/controllers/request/request.dto";
import { ModalParent } from "@/components/ModalParent";
import RequestDetails from "@/components/requests/RequestDetails";
import StatusSwitcher from "@/components/StatusSwitcher";
import { RequestController } from "@/database/controllers/request/request.controller";
import ResultSwitcher from "@/components/ResultSwitcher";
import RequestUpdater from "@/components/requests/RequestUpdater";
import { ObjectController } from "@/database/controllers/object/object.controller";
import getObjects = ObjectController.getObjects;
import { EmployeeController } from "@/database/controllers/employee/employee.controller";
import getEmployees = EmployeeController.getEmployees;

interface Props {
  request: SelectedRequest;
  className: string;
  focus?: boolean;
}

export default async function RequestCard({
  request,
  className,
  focus,
}: Props) {
  const statusCarousel = [
    REQUEST_STATUS_ENUM.TODO,
    REQUEST_STATUS_ENUM.IN_PROGRESS,
    REQUEST_STATUS_ENUM.QA,
    REQUEST_STATUS_ENUM.DONE,
  ];
  return (
    <div
      className={
        "transition-all ease-in-out card w-72 mb-3 bg-base-100 shadow-l hover:shadow-2xl " +
        className
      }
    >
      <div className="card-body flex-1 flex-row justify-between group">
        <div className="flex-col">
          <h2 className="card-title">R-{request.id}</h2>
          <p className="truncate w-44">{request.description}</p>
        </div>
        <ModalParent
          buttonText="Edit"
          className="transition-all ease-in-out opacity-0 group-hover:opacity-100 text-gray-500"
        >
          <RequestUpdater
            updateAction={RequestController.upDateRequestAction}
            request={request}
            objects={await getObjects()}
            employees={await getEmployees()}
          />
        </ModalParent>
      </div>
      <div className="card-actions justify-center mb-5">
        <ResultSwitcher
          updateAction={RequestController.upDateRequestAction}
          item={request}
        />
        <StatusSwitcher
          updateAction={RequestController.upDateRequestAction}
          array={statusCarousel}
          item={request}
          direction={false}
        />
        <StatusSwitcher
          updateAction={RequestController.upDateRequestAction}
          array={statusCarousel}
          item={request}
          direction={true}
        />
        <ModalParent
          buttonText="Details"
          className="btn btn-ghost"
          initialState={focus}
        >
          <RequestDetails requestId={request.id} />
        </ModalParent>
      </div>
    </div>
  );
}
