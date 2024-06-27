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
    <form action={createAction} className="flex flex-col space-y-4">
      <label className="form-control">
        <label className="label-text">Description</label>
        <input
          type="text"
          className="input input-bordered"
          name="description"
          placeholder="Type here..."
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
        />
      </label>
      <label className="form-control">
        <label className="label-text">Select request</label>
        <select className="select select-bordered" name="requestId">
          {requests.map((request: SelectedRequest, index) => (
            <option key={index} value={request.id}>
              R-{request.id}
            </option>
          ))}
        </select>
      </label>
      <label className="form-control">
        <label className="label-text">Select activity type</label>
        <select className="select select-bordered" name="actType">
          {activityTypes.map((type: string, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label className="form-control">
        <label className="label-text">Select employee</label>
        <select className="select select-bordered" name="employeeId">
          {employees.map((employee: SelectedEmployee, index) => (
            <option key={index} value={employee.id}>
              {employee.fname + " " + employee.lname}
            </option>
          ))}
        </select>
      </label>
      <button className={"btn " + className} type="submit">
        Add Request
      </button>
    </form>
  );
}
