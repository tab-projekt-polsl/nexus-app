// Makes me do a module and then doesn't like the module either >:(

import Employee from "@/database/models/employee";
import * as bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import type {
  CreateEmployeeDTO,
  EMPLOYEE_ROLE,
  SelectedEmployee,
} from "./employee.dto";
import { EMPLOYEE_FIELDS } from "./employee.dto";
import { getJwtSecretKey } from "@/libs/auth";
import type { LoginResponse } from "./login-response.dto";
import Request from "@/database/models/request";
import { revalidatePath } from "next/cache";

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
    "use server";
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
      role: employee.getDataValue("role"),
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30s")
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

  export async function loginEmployeeAction(formData: FormData) {
    "use server";
    const uname = formData.get("uname") as string;
    const password = formData.get("password") as string;

    try {
      const { token } = await EmployeeController.loginEmployee(uname, password);

      return { token };
    } catch (error) {
      console.error(error);
      throw new Error("Invalid credentials");
    }
  }

  export async function createEmployee(
    employeeInfo: CreateEmployeeDTO,
  ): Promise<Employee> {
    "use server";
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

  export async function createEmployeeAction(formData: FormData) {
    "use server";
    const employeeInfo = {
      fname: formData.get("fname") as string,
      lname: formData.get("lname") as string,
      role: formData.get("role") as EMPLOYEE_ROLE,
      uname: formData.get("uname") as string,
      password: formData.get("password") as string,
    };
    await createEmployee(employeeInfo);
    revalidatePath(`/management`);
  }

  export async function updateEmployee(
    id: number,
    field: any,
    value: any,
  ): Promise<[affectedCount: number]> {
    "use server";
    if (field === "password") {
      const hashedPassword = await bcrypt.hash(value, 10);
      return Employee.update(
        { password: hashedPassword },
        {
          where: {
            id,
          },
        },
      );
    }
    return Employee.update(
      { [field]: value },
      {
        where: {
          id,
        },
      },
    );
  }

  export async function updateEmployeeAction(formData: FormData) {
    "use server";
    const fields = Object.values(EMPLOYEE_FIELDS) as string[];
    for (const field of fields) {
      if (formData.get(field)) {
        await updateEmployee(
          parseInt(formData.get("id") as string, 10),
          field,
          formData.get(field),
        );
      }
    }
    revalidatePath(`/management`);
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

  export async function getEmployee(id: number): Promise<SelectedEmployee> {
    const employee = await Employee.findOne({
      where: {
        id: id,
      },
    });
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee.toJSON();
  }

  export async function getEmployeeByRequestId(
    id: string,
  ): Promise<SelectedEmployee> {
    return Request.findOne({
      where: {
        employeeId: id,
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
