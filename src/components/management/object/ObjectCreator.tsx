"use client";
import React, { useState } from "react";
import type { SelectedClient } from "@/database/controllers/client/client.dto";

interface Props {
  className?: string;
  createAction: any;
  types: string[];
  clients: SelectedClient[];
}
export default function ObjectCreator({
  createAction,
  className,
  types,
  clients,
}: Props) {
  const [name, setName] = useState("");
  const [objectType, setObjectType] = useState("");
  const [clientId, setClientId] = useState("");

  return (
    <div className="card-body">
      <h2 className="card-title">Add an Object</h2>
      <form action={createAction} method="POST">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            className="input input-bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Object Type</span>
          </label>
          <select
            name="objectType"
            className="select select-bordered"
            value={objectType}
            onChange={(e) => setObjectType(e.target.value)}
            required
          >
            <option value="">Select Object Type</option>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Client</span>
          </label>
          <select
            name="clientId"
            className="select select-bordered"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          >
            <option value="">Select Client</option>
            {clients.map((client, index) => (
              <option key={index} value={client.id}>
                {client.fname + " " + client.lname}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control mt-6">
          <button type="submit" className={"btn btn-outline " + className}>
            Create Object
          </button>
        </div>
      </form>
    </div>
  );
}
