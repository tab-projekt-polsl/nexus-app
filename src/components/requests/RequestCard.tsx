import React from "react";
import type { SelectedRequest } from "@/database/controllers/request/request.dto";
import { BsCheckCircleFill, BsClockFill } from "react-icons/bs";
import { RouteModal } from "@/components/RouteModal";

interface Props {
  request: SelectedRequest;
  className: string;
}

export default function RequestCard({ request, className }: Props) {
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
        <RouteModal
          route={`/requests/${request.id}`}
          buttonText="Details"
          className="btn btn-primary"
        />
      </div>
    </div>
  );
}
