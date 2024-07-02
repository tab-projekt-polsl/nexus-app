"use client";
import React, { useState } from "react";
import type { SelectedObject } from "@/database/controllers/object/object.dto";
import type { SelectedClient } from "@/database/controllers/client/client.dto";

interface Props {
  object: SelectedObject;
  updateAction: any;
  types: string[];
  clients: SelectedClient[];
}

export default function ObjectUpdater({
  object,
  updateAction,
  clients,
  types,
}: Props) {
  const [name, setName] = useState(object.name);
  const [objectType, setObjectType] = useState(object.objectType.toString());
  const [clientId, setClientId] = useState(object.clientId);
  return (
    <div className="card-body">
      <h1 className="card-title">Edit O-{object.id}</h1>
      <form action={updateAction} method="POST">
        <input type="hidden" name="id" value={object.id} />
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
            <option value="">Select an object type</option>
            {types.map((type: string, index) => (
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
            onChange={(e) => setClientId(parseInt(e.target.value, 10))}
            required
          >
            <option value="">Select a client</option>
            {clients.map((client: SelectedClient, index) => (
              <option key={index} value={client.id}>
                {client.fname + " " + client.lname}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-outline">
            Update Object
          </button>
        </div>
      </form>
    </div>
  );
}
