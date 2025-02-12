/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import Activity from "@/database/models/activity";
import Address from "@/database/models/address";
import Client from "@/database/models/client";
import Employee from "@/database/models/employee";
import DbObject from "@/database/models/object";
import Request from "@/database/models/request";
import { ActivityController } from "@/database/controllers/activity/activity.controller";
import {
  ACTIVITY_STATUS_ENUM,
  ACTIVITY_TYPE_ENUM,
} from "@/database/controllers/activity/activity.dto";
import { RequestController } from "@/database/controllers/request/request.controller";
import { REQUEST_STATUS_ENUM } from "@/database/controllers/request/request.dto";
import { ObjectController } from "@/database/controllers/object/object.controller";
import { OBJECT_TYPE_ENUM } from "@/database/controllers/object/object.dto";
import { ClientController } from "@/database/controllers/client/client.controller";
import { EmployeeController } from "@/database/controllers/employee/employee.controller";
import { EMPLOYEE_ROLE } from "@/database/controllers/employee/employee.dto";
import { AddressController } from "@/database/controllers/address/address.controller";

export namespace Tester {
  export function addSamepleRequests(): void {
    RequestController.createRequest({
      description: "Test1",
      result: true,
      status: REQUEST_STATUS_ENUM.DONE,
      dateReg: new Date(),
      dateFinCancel: new Date(),
      objectId: 13,
      employeeId: 21,
    });
    RequestController.createRequest({
      description: "Test2",
      result: false,
      status: REQUEST_STATUS_ENUM.TODO,
      dateReg: new Date(),
      dateFinCancel: new Date(),
      objectId: 13,
      employeeId: 21,
    });
  }

  export function addSampleActivities(): void {
    ActivityController.createActivity({
      // sequenceNum: 1,
      description: "First activity",
      result: true,
      status: ACTIVITY_STATUS_ENUM.DONE,
      dateReg: new Date(),
      dateFinCancel: new Date(),
      actType: ACTIVITY_TYPE_ENUM.HARD,
      requestId: 18,
      employeeId: 21,
    });
    ActivityController.createActivity({
      // sequenceNum: 2,
      description: "Second activity",
      result: false,
      status: ACTIVITY_STATUS_ENUM.TODO,
      dateReg: new Date(),
      dateFinCancel: new Date(),
      actType: ACTIVITY_TYPE_ENUM.MEDIUM,
      requestId: 18,
      employeeId: 21,
    });
    ActivityController.createActivity({
      // sequenceNum: 3,
      description: "Third activity",
      result: false,
      status: ACTIVITY_STATUS_ENUM.IN_PROGRESS,
      dateReg: new Date(),
      dateFinCancel: new Date(),
      actType: ACTIVITY_TYPE_ENUM.EASY,
      requestId: 18,
      employeeId: 25,
    });
  }

  export function addSampleObjects(): void {
    ObjectController.createObject({
      name: "First object",
      objectType: OBJECT_TYPE_ENUM.OBJ1,
      clientId: 5,
    });
    ObjectController.createObject({
      name: "Second object",
      objectType: OBJECT_TYPE_ENUM.OBJ2,
      clientId: 6,
    });
    ObjectController.createObject({
      name: "Third object",
      objectType: OBJECT_TYPE_ENUM.OBJ3,
      clientId: 9,
    });
  }

  export function addSampleClients(): void {
    ClientController.createClient({
      // name: "First client1",
      fname: "First",
      lname: "Client",
      tel: 1234567890,
    });
    ClientController.createClient({
      // name: "Second client1",
      fname: "Second",
      lname: "Client",
      tel: 1234567890,
    });
  }

  export function addSampleEmployees(): void {
    EmployeeController.createEmployee({
      fname: "First",
      lname: "Employee",
      role: EMPLOYEE_ROLE.ADMIN,
      uname: "admin2",
      password: "admin",
    });
    EmployeeController.createEmployee({
      fname: "Second",
      lname: "Employee",
      role: EMPLOYEE_ROLE.MANAGER,
      uname: "manager2",
      password: "manager",
    });
    EmployeeController.createEmployee({
      fname: "Third",
      lname: "Employee",
      role: EMPLOYEE_ROLE.WORKER,
      uname: "worker2",
      password: "worker",
    });
  }

  export function addSampleAdresses(): void {
    AddressController.createAddress({
      city: "First city",
      street: "First street",
      homeNumber: "1",
      zipCode: "12345",
      clientId: 5,
    });
    AddressController.createAddress({
      city: "Second city",
      street: "Second street",
      homeNumber: "2",
      zipCode: "23456",
      clientId: 6,
    });
    AddressController.createAddress({
      city: "Third city",
      street: "Third street",
      homeNumber: "3",
      zipCode: "34567",
      clientId: 9,
    });
  }

  export function syncAllModelsAndTest(): void {
    Activity.sync();
    Address.sync();
    Client.sync();
    Employee.sync();
    DbObject.sync();
    Request.sync();

    testData();
  }

  export function wipeData(): void {
    ActivityController.obliterate();
    RequestController.obliterate();
    ObjectController.obliterate();
    ClientController.obliterate();
    EmployeeController.obliterate();
    AddressController.obliterate();
  }

  export function testData(): void {
    // addSampleData();
    // addSampleActivities();
    // addSamepleRequests();
    // addSampleObjects();
    // addSampleClients();
    // addSampleEmployees();
    // addSampleAdresses();
    /* AddressController.getAddresses().then((addresses) => {
      log(addresses);
    }); */
    /* EmployeeController.getEmployees().then((employees) => {
      log(employees);
    }); */
    /* ClientController.getClients().then((clients) => {
      log(clients);
    }); */
    /* ObjectController.getObjects().then((objects) => {
      log(objects);
    }); */
    /*     RequestController.getRequests().then((requests) => {
      log(requests);
    }); */
    /* ActivityController.getActivities().then((activities) => {
      console.log(activities);
    }); */
    /* ClientController.getRequestsByClientId(5).then((requests) => {
      console.log(requests);
    }); */
    /* ActivityController.updateActivity(
      16,
      "description",
      "Updated description",
    ).then((affectedCount) => {
      console.log(affectedCount);
    }); */
    /* EmployeeController.loginEmployee("worker2", "worker").then((response) => {
      EmployeeController.isTokenValid(response.token).then((isValid) => {
        console.log(isValid);
      });
    }); */
    /* RequestController.getClientByRequestId(24).then((client) => {
      log(client);
    }); */
    // wipeData();
  }
}
