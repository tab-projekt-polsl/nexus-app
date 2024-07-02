"use client";

import type { SelectedRequest } from "@/database/controllers/request/request.dto";
import type { SelectedEmployee } from "@/database/controllers/employee/employee.dto";
import type { SelectedActivity } from "@/database/controllers/activity/activity.dto";
import moment from "moment";
import { useState } from "react";

interface Props {
  className?: string;
  updateAction: any;
  requests: SelectedRequest[];
  activity: SelectedActivity;
  employees: SelectedEmployee[];
  activityTypes: string[];
}

export default function ActivityUpdater({
  className,
  updateAction,
  requests,
  activity,
  employees,
  activityTypes,
}: Props) {
  const [dateFinCancel, setDateFinCancel] = useState<string>(
    moment(activity.dateFinCancel).format("YYYY-MM-DD"),
  );
  const [description, setDescription] = useState<string>(activity.description);
  const [requestId, setRequestId] = useState<number>(activity.requestId);
  const [employeeId, setEmployeeId] = useState<number>(activity.employeeId);
  const [actType, setActType] = useState<string>(activity.actType);

  return (
    <div className="card-body h-full">
      <h2 className="card-title">Edit Activity A-{activity.id}</h2>
      <form
        action={updateAction}
        method="post"
        className="flex flex-col space-y-4"
      >
        <input type="hidden" name="id" value={activity.id} />
        <input type="hidden" name="isUpdate" value="yes" />
        <input
          type="hidden"
          name="result"
          value={activity.result ? "1" : "0"}
        />
        <input type="hidden" name="status" value={activity.status} />
        <input type="hidden" name="actType" value={activity.actType} />
        <input type="hidden" name="sequenceNum" value={activity.sequenceNum} />
        <input
          type="hidden"
          name="dateReg"
          value={activity.dateReg.toISOString()}
        />
        <label className="form-control">
          <label className="label-text">Description</label>
          <input
            type="text"
            className="input input-bordered"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type here..."
            required
          />
        </label>
        <label className="form-control">
          <label className="label-text">Finish date</label>
          <input
            type="date"
            className="input input-bordered"
            name="dateFinCancel"
            value={dateFinCancel}
            onChange={(e) => setDateFinCancel(e.target.value)}
            required
          />
        </label>
        <label className="form-control">
          <label className="label-text">Select activity type</label>
          <select
            className="select select-bordered"
            name="actType"
            value={actType}
            onChange={(e) => setActType(e.target.value)}
            required
          >
            {activityTypes.map((type: string, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="form-control">
          <label className="label-text">Select request</label>
          <select
            className="select select-bordered"
            name="requestId"
            value={requestId}
            onChange={(e) => setRequestId(parseInt(e.target.value, 10))}
            required
          >
            <option value="">Select a request</option>
            {requests.map((request: SelectedRequest, index) => (
              <option key={index} value={request.id}>
                R-{request.id}
              </option>
            ))}
          </select>
        </label>
        <label className="form-control">
          <label className="label-text">Select employee</label>
          <select
            className="select select-bordered"
            name="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(parseInt(e.target.value, 10))}
            required
          >
            <option value="">Select an employee</option>
            {employees.map((employee: SelectedEmployee, index) => (
              <option key={index} value={employee.id}>
                {employee.fname + " " + employee.lname}
              </option>
            ))}
          </select>
        </label>
        <button className={"btn btn-outline " + className} type="submit">
          Edit Activity
        </button>
      </form>
    </div>
  );
}
