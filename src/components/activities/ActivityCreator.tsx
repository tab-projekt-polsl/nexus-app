"use client";

import type { SelectedEmployee } from "@/database/controllers/employee/employee.dto";
import type { SelectedRequest } from "@/database/controllers/request/request.dto";

interface Props {
  className?: string;
  createAction: any;
  requests: SelectedRequest[];
  employees: SelectedEmployee[];
  activityTypes: string[];
}

export default function ActivityCreator({
  className,
  createAction,
  requests,
  employees,
  activityTypes,
}: Props) {
  return (
    <form
      action={createAction}
      method="post"
      className="flex flex-col space-y-4"
    >
      <label className="form-control">
        <label className="label-text">Description</label>
        <input
          type="text"
          className="input input-bordered"
          name="description"
          placeholder="Type here..."
          required
        />
      </label>
      <input type="hidden" name="result" value="0" />
      <input type="hidden" name="status" value="TODO" />
      <input type="hidden" name="dateReg" value={new Date().toISOString()} />
      <label className="form-control">
        <label className="label-text">Finish date</label>
        <input
          type="date"
          className="input input-bordered"
          name="dateFinCancel"
          required
        />
      </label>
      <label className="form-control">
        <label className="label-text">Select request</label>
        <select className="select select-bordered" name="requestId" required>
          <option value="">Select a request</option>
          {requests.map((request: SelectedRequest, index) => (
            <option key={index} value={request.id}>
              R-{request.id}
            </option>
          ))}
        </select>
      </label>
      <label className="form-control">
        <label className="label-text">Select activity type</label>
        <select className="select select-bordered" name="actType" required>
          <option value="">Select an activity type</option>
          {activityTypes.map((type: string, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label className="form-control">
        <label className="label-text">Select employee</label>
        <select className="select select-bordered" name="employeeId" required>
          <option value="">Select an employee</option>
          {employees.map((employee: SelectedEmployee, index) => (
            <option key={index} value={employee.id}>
              {employee.fname + " " + employee.lname}
            </option>
          ))}
        </select>
      </label>
      <button className={"btn " + className} type="submit">
        Add Activity
      </button>
    </form>
  );
}
