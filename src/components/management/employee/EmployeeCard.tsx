import React from "react";
import { ACTIVITY_STATUS_ENUM } from "@/database/controllers/activity/activity.dto";
import { ModalParent } from "@/components/ModalParent";
import ActivityDetails from "@/components/activities/ActivityDetails";
import ResultSwitcher from "@/components/ResultSwitcher";
import StatusSwitcher from "@/components/StatusSwitcher";
import { ActivityController } from "@/database/controllers/activity/activity.controller";
import { SelectedClient } from "@/database/controllers/client/client.dto";
import { SelectedObject } from "@/database/controllers/object/object.dto";
import { SelectedEmployee } from "@/database/controllers/employee/employee.dto";

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
      <div className="card-body flex-1 flex-row justify-between">
        <div className="flex-col">
          <h2 className="card-title">
            {employee.fname + " " + employee.lname}
          </h2>
        </div>
      </div>
      <div className="card-actions justify-end mb-5 mr-5">
        {/*<ModalParent buttonText="Edit" initialState={focus}>*/}
        {/*  <EmployeeUpdater employee={employee} />*/}
        {/*</ModalParent>*/}
        {/*<ModalParent*/}
        {/*  buttonText="Details"*/}
        {/*  className="btn btn-primary"*/}
        {/*  initialState={focus}*/}
        {/*>*/}
        {/*  <EmployeeDetails employee={employee.id} />*/}
        {/*</ModalParent>*/}
      </div>
    </div>
  );
}
