"use client";

import type { SelectedObject } from "@/database/controllers/object/object.dto";
import type { SelectedEmployee } from "@/database/controllers/employee/employee.dto";

interface Props {
  className?: string;
  createAction: any;
  objects: SelectedObject[];
  employees: SelectedEmployee[];
}

export default function RequestCreator({
  className,
  createAction,
  objects,
  employees,
}: Props) {
  return (
    <div className="card-body h-full">
      <h2 className="card-title">Create Request</h2>
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
          <label className="label-text">Select object</label>
          <select className="select select-bordered" name="objectId" required>
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
          Add Request
        </button>
      </form>
    </div>
  );
}
