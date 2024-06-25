"use client";

import type { SelectedObject } from "@/database/controllers/object/object.dto";
import type { SelectedEmployee } from "@/database/controllers/employee/employee.dto";

interface Props {
  className?: string;
  createAction: any;
  objects: SelectedObject[];
  employees: SelectedEmployee[];
}
export default function RequestForm({
  className,
  createAction,
  objects,
  employees,
}: Props) {
  return (
    <form action={createAction} className="flex flex-col space-y-4">
      <input type="text" className="input input-bordered" name="description" />
      <input type="hidden" name="result" value="0" />
      <input type="hidden" name="status" value="TODO" />
      <input type="hidden" name="dateReg" value={new Date().toISOString()} />
      <input
        type="date"
        className="input input-bordered"
        name="dateFinCancel"
      />
      <select className="select select-bordered" name="objectId">
        {objects.map((object: SelectedObject, index) => (
          <option key={index} value={object.id}>
            {object.name}
          </option>
        ))}
      </select>
      <select className="select select-bordered" name="employeeId">
        {employees.map((employee: SelectedEmployee, index) => (
          <option key={index} value={employee.id}>
            {employee.fname + " " + employee.lname}
          </option>
        ))}
      </select>
      <button className={"btn " + className} type="submit">
        Add Request
      </button>
    </form>
  );
}
