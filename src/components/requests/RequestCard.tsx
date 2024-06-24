import React from "react";
import type { SelectedRequest } from "@/database/controllers/request/request.dto";
import { REQUEST_STATUS_ENUM } from "@/database/controllers/request/request.dto";
import { ModalParent } from "@/components/ModalParent";
import RequestDetails from "@/components/requests/RequestDetails";
import StatusSwitcher from "@/components/StatusSwitcher";
import { RequestController } from "@/database/controllers/request/request.controller";
import ResultSwitcher from "@/components/ResultSwitcher";

interface Props {
  request: SelectedRequest;
  className: string;
  focus?: boolean;
}

export default function RequestCard({ request, className, focus }: Props) {
  const statusCarousel = [
    REQUEST_STATUS_ENUM.TODO,
    REQUEST_STATUS_ENUM.IN_PROGRESS,
    REQUEST_STATUS_ENUM.QA,
    REQUEST_STATUS_ENUM.DONE,
  ];
  return (
    <div
      className={
        "transition-all ease-in-out card w-72 bg-base-100 shadow-l hover:shadow-2xl " +
        className
      }
    >
      <div className="card-body flex-1 flex-row justify-between">
        <div className="flex-col">
          <h2 className="card-title">R-{request.id}</h2>
          <p className="truncate w-36">{request.description}</p>
        </div>
      </div>
      <div className="card-actions justify-end mb-5 mr-5">
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
          className="btn btn-primary"
          initialState={focus}
        >
          <RequestDetails requestId={request.id} />
        </ModalParent>
      </div>
    </div>
  );
}
