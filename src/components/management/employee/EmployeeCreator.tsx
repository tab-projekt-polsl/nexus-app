"use client";
import React, { useState } from "react";

interface Props {
  className?: string;
  createAction: any;
  roles: string[];
}
export default function EmployeeCreator({
  className,
  createAction,
  roles,
}: Props) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  return (
    <form action={createAction} method="POST">
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
          <span className="label-text">Username</span>
        </label>
        <input
          type="text"
          name="uname"
          className="input input-bordered"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          name="password"
          className="input input-bordered"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Role</span>
        </label>
        <select
          name="role"
          className="select select-bordered"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control mt-6">
        <button type="submit" className={"btn btn-outline " + className}>
          Create Employee
        </button>
      </div>
    </form>
  );
}
