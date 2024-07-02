import React from "react";
import { ModalParent } from "@/components/ModalParent";
import type { SelectedEmployee } from "@/database/controllers/employee/employee.dto";
import { EMPLOYEE_ROLE } from "@/database/controllers/employee/employee.dto";
import EmployeeDetails from "@/components/management/employee/EmployeeDetails";
import EmployeeUpdater from "@/components/management/employee/EmployeeUpdater";
import { EmployeeController } from "@/database/controllers/employee/employee.controller";
import updateEmployeeAction = EmployeeController.updateEmployeeAction;

interface Props {
  employee: SelectedEmployee;
  className: string;
  focus?: boolean;
}

export default function EmployeeCard({ employee, className, focus }: Props) {
  return (
    <div
      className={
        "transition-all ease-in-out card w-72 bg-base-100 shadow-l hover:shadow-2xl " +
        className
      }
    >
      <div className="card-body flex-1 flex-row justify-between group">
        <div className="flex-col">
          <h2 className="card-title">
            {employee.fname + " " + employee.lname}
          </h2>
          <p className="text-gray-400">{employee.role}</p>
        </div>
        <ModalParent
          buttonText="Edit"
          initialState={focus}
          className="transition-all ease-in-out opacity-0 group-hover:opacity-100 text-gray-500"
        >
          <EmployeeUpdater
            employee={employee}
            updateAction={updateEmployeeAction}
            roles={Object.values(EMPLOYEE_ROLE) as string[]}
          />
        </ModalParent>
      </div>
      <div className="card-actions justify-center mb-5">
        <ModalParent
          buttonText="Details"
          className="btn btn-ghost"
          initialState={focus}
        >
          <EmployeeDetails employeeId={employee.id} />
        </ModalParent>
      </div>
    </div>
  );
}
