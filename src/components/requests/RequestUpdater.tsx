"use client";

import type { SelectedObject } from "@/database/controllers/object/object.dto";
import type { SelectedEmployee } from "@/database/controllers/employee/employee.dto";
import type { SelectedRequest } from "@/database/controllers/request/request.dto";
import moment from "moment";
import { useState } from "react";
import type { SelectedActivity } from "@/database/controllers/activity/activity.dto";
import SequenceShifter from "@/components/SequenceShifter";

interface Props {
  className?: string;
  updateAction: any;
  shiftActivityAction: any;
  request: SelectedRequest;
  objects: SelectedObject[];
  employees: SelectedEmployee[];
  activities: SelectedActivity[];
}

export default function RequestUpdater({
  className,
  updateAction,
  shiftActivityAction,
  request,
  objects,
  employees,
  activities,
}: Props) {
  const [dateFinCancel, setDateFinCancel] = useState<string>(
    moment(request.dateFinCancel).format("YYYY-MM-DD"),
  );
  const [description, setDescription] = useState<string>(request.description);
  const [objectId, setObjectId] = useState<number>(request.objectId);
  const [employeeId, setEmployeeId] = useState<number>(request.employeeId);

  return (
    <div className="card-body h-full">
      <h2 className="card-title">Edit Request R-{request.id}</h2>
      <form
        action={updateAction}
        method="post"
        className="flex flex-col space-y-4"
      >
        <input type="hidden" name="id" value={request.id} />
        <input type="hidden" name="isUpdate" value="yes" />
        <input type="hidden" name="result" value={request.result ? "1" : "0"} />
        <input type="hidden" name="status" value={request.status} />
        <input
          type="hidden"
          name="dateReg"
          value={request.dateReg.toISOString()}
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
          <label className="label-text">Select object</label>
          <select
            className="select select-bordered"
            name="objectId"
            value={objectId}
            onChange={(e) => setObjectId(parseInt(e.target.value, 10))}
            required
          >
            <option value="">Select an object</option>
            {objects.map((object: SelectedObject, index) => (
              <option key={index} value={object.id}>
                {object.name}
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
          Edit Request
        </button>
      </form>
      {activities.length > 0 ? (
        <div className="text-center mt-4">Rearrange Activities</div>
      ) : (
        ""
      )}

      <div className="flex flex-row overflow-y-clip justify-center">
        {activities.map((activity: SelectedActivity, index) => (
          <SequenceShifter
            shiftAction={shiftActivityAction}
            elementText={"A-" + activity.id}
            elementId={activity.id}
            key={index}
            className=""
          />
        ))}
      </div>
    </div>
  );
}
