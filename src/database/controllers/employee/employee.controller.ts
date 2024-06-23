// Makes me do a module and then doesn't like the module either >:(

import Employee from "@/database/models/employee";
import * as bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import type { CreateEmployeeDTO, SelectedEmployee } from "./employee.dto";
import { getJwtSecretKey } from "@/libs/auth";
import type { LoginResponse } from "./login-response.dto";

const salt = "saltyPasswordsAreYummy";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EmployeeController {
  export async function isTokenValid(token: string): Promise<boolean> {
    try {
      await jwtVerify(token, getJwtSecretKey());
      return true;
    } catch (error) {
      return false;
    }
  }
  export async function loginEmployee(
    uname: string,
    password: string,
  ): Promise<LoginResponse> {
    const employee = await Employee.findOne({ where: { uname } });
    if (!employee) {
      throw new Error("Employee not found");
    }
    const passwordMatch = await bcrypt.compare(
      password,
      employee.getDataValue("password"),
    );
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const token = await new SignJWT({
      username: employee.getDataValue("uname"),
      role: employee.getDataValue("role"), // Set your own roles
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30s") // Set your own expiration time
      .sign(getJwtSecretKey());

    if (!token) {
      throw new Error("Token not generated");
    }

    return {
      employee: {
        id: employee.getDataValue("id"),
        fname: employee.getDataValue("fname"),
        lname: employee.getDataValue("lname"),
        role: employee.getDataValue("role"),
        uname: employee.getDataValue("uname"),
      },
      token: token,
    };
  }
  export async function createEmployee(
    employeeInfo: CreateEmployeeDTO,
  ): Promise<Employee> {
    if (!employeeInfo) {
      throw new Error("Employee info is required");
    }
    const hashedPassword = await bcrypt.hash(employeeInfo.password, 10);

    return Employee.create({
      fname: employeeInfo.fname,
      lname: employeeInfo.lname,
      role: employeeInfo.role,
      uname: employeeInfo.uname,
      password: hashedPassword,
    });
  }

  export async function updateEmployee(
    id: number,
    field: keyof CreateEmployeeDTO,
    value: any,
  ): Promise<[affectedCount: number]> {
    return Employee.update(
      { [field]: value },
      {
        where: {
          id,
        },
      },
    );
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
