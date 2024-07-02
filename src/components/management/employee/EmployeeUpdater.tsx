"use client";
import React, { useState } from "react";
import type { SelectedEmployee } from "@/database/controllers/employee/employee.dto";

interface Props {
  employee: SelectedEmployee;
  updateAction: any;
  roles: string[];
}

export default function EmployeeUpdater({
  employee,
  updateAction,
  roles,
}: Props) {
  const [fname, setFname] = useState(employee.fname);
  const [lname, setLname] = useState(employee.lname);
  const [role, setRole] = useState(employee.role.toString());

  return (
    <div className="card-body">
      <h2 className="card-title">
        Edit employee {employee.fname} {employee.lname}
      </h2>
      <form action={updateAction} method="POST">
        <input type="hidden" name="id" value={employee.id} />
        <div className="form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            name="fname"
            className="input input-bordered"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            name="lname"
            className="input input-bordered"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select a role</span>
          </label>
          <select
            className="select select-bordered"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select a role</option>
            {roles.map((role: string, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-outline">
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
}
