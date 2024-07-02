import { EmployeeController } from "@/database/controllers/employee/employee.controller";
import Link from "next/link";
import { ActivityController } from "@/database/controllers/activity/activity.controller";

interface Props {
  employeeId: number;
}

export default async function EmployeeDetails({ employeeId }: Props) {
  const employee = await EmployeeController.getEmployee(employeeId);
  const activities =
    await ActivityController.getActivitiesByEmployeeId(employeeId);

  return (
    <div className=" bg-base-100 h-full">
      <div className="card-body h-full">
        <h2 className="card-title">{employee.fname + " " + employee.lname}</h2>
        <p>Role: {employee.role}</p>
        <p>Username: {employee.uname}</p>
        <div className="">
          {activities.length > 0 ? "Activities:" : ""}
          {activities.map((activity, index) => (
            <Link key={index} href={`/activities/board/${activity.id}`}>
              <div className="btn ml-2">A-{activity.id}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
