// Makes me do a module and then doesn't like the module either >:(

import Employee from "@/database/models/employee";
import type { CreateEmployeeDTO, SelectedEmployee } from "./employee.dto";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EmployeeController {
  export async function createEmployee(
    employeeInfo: CreateEmployeeDTO,
  ): Promise<Employee> {
    if (!employeeInfo) {
      throw new Error("Employee info is required");
    }
    return Employee.create({
      fname: employeeInfo.fname,
      lname: employeeInfo.lname,
      role: employeeInfo.role,
      uname: employeeInfo.uname,
      password: employeeInfo.password,
    });
  }

  export function updateEmployee(): void {
    console.log("Updating activity");
  }

  /**
   *
   * @param id id to delete
   * @returns number of affected rows
   */
  export function deleteEmployee(id: number): Promise<number> {
    return Employee.destroy({
      where: {
        id,
      },
    });
  }

  export function obliterate(): void {
    Employee.destroy({
      where: {},
    });
  }

  export function getEmployee(id: number): Promise<SelectedEmployee> {
    return Employee.findOne({
      where: {
        id: id,
      },
    }).then((employee) => {
      if (!employee) {
        throw new Error("Employee not found");
      }
      return employee.toJSON();
    });
  }

  export async function getEmployees(): Promise<any[]> {
    return (await Employee.findAll()).map((employee) => employee.toJSON());
  }
}
