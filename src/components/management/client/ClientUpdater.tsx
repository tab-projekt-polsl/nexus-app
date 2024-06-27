"use client";

import { useState } from "react";
import type { SelectedClient } from "@/database/controllers/client/client.dto";
import type { SelectedAddress } from "@/database/controllers/address/address.dto";

interface Props {
  className?: string;
  updateAction: any;
  addressUpdateAction: any;
  client: SelectedClient;
  address: SelectedAddress;
}

export default function ClientUpdater({
  className,
  updateAction,
  addressUpdateAction,
  client,
  address,
}: Props) {
  const [fname, setFname] = useState<string>(client.fname);
  const [lname, setLname] = useState<string>(client.lname);
  const [tel, setTel] = useState<number>(client.tel);
  const [street, setStreet] = useState<string>(address.street);
  const [homeNumber, setHomeNumber] = useState<string>(address.homeNumber);
  const [zipCode, setZipCode] = useState<string>(address.zipCode);
  const [city, setCity] = useState<string>(address.city);
  return (
    <div className="card-body h-full">
      <h2 className="card-title">
        Edit client {client.fname} {client.lname}
      </h2>
      <form
        action={updateAction}
        method="post"
        className="flex flex-col space-y-4"
      >
        <input type="hidden" name="id" value={client.id} />
        <input type="hidden" name="isUpdate" value="yes" />
        <label className="form-control">
          <label className="label-text">First name</label>
          <input
            type="text"
            className="input input-bordered"
            name="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            placeholder="Type here..."
            required
          />
        </label>
        <label className="form-control">
          <label className="label-text">Last name</label>
          <input
            type="text"
            className="input input-bordered"
            name="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            placeholder="Type here..."
            required
          />
        </label>
        <label className="form-control">
          <label className="label-text">Telephone number</label>
          <input
            type="tel"
            className="input input-bordered"
            name="tel"
            value={tel}
            onChange={(e) => setTel(parseInt(e.target.value, 10))}
            placeholder="Type here..."
            required
          />
        </label>
        <button className={"btn btn-outline " + className} type="submit">
          Edit Client
        </button>
      </form>
      <form
        action={addressUpdateAction}
        method="post"
        className="flex flex-col space-y-4 max-w-30"
      >
        <input type="hidden" name="clientId" value={client.id} />
        <div className="flex flex-row justify-center">
          <label className="form-control">
            <label className="label-text">Street</label>
            <input
              type="text"
              className="input input-bordered w-60 mr-1"
              name="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </label>
          <label className="form-control">
            <label className="label-text">Home</label>
            <input
              type="text"
              className="input input-bordered w-20"
              name="homeNumber"
              value={homeNumber}
              onChange={(e) => setHomeNumber(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="flex flex-row flex-wrap justify-center">
          <label className="form-control">
            <label className="label-text">Zip code</label>
            <input
              type="text"
              className="input input-bordered w-36 mr-1"
              name="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </label>
          <label className="form-control">
            <label className="label-text">City</label>
            <input
              type="text"
              className="input input-bordered w-44"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
        </div>
        <button className={"btn btn-outline " + className} type="submit">
          Edit Address
        </button>
      </form>
    </div>
  );
}
