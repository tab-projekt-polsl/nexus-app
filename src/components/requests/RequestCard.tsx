import React from "react";
import type { SelectedRequest } from "@/database/controllers/request/request.dto";
import { BsCheckCircleFill, BsClockFill } from "react-icons/bs";
import { ModalParent } from "@/components/ModalParent";
import RequestDetails from "@/components/requests/RequestDetails";

interface Props {
  request: SelectedRequest;
  className: string;
  focus?: boolean;
}

export default function RequestCard({ request, className, focus }: Props) {
  return (
    <div
      className={
        "transition-all ease-in-out card w-64 bg-base-100 shadow-l hover:shadow-2xl " +
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
        <div className="self-center flex-wrap mr-3">
          {request.result ? (
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
          <RequestDetails requestId={request.id} />
        </ModalParent>
      </div>
    </div>
  );
}
