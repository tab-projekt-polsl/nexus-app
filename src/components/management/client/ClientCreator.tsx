"use client";

import { useState } from "react";

interface Props {
  className?: string;
  createAction: any;
}

export default function ClientCreator({ className, createAction }: Props) {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [tel, setTel] = useState<number>();
  const [street, setStreet] = useState<string>("");
  const [homeNumber, setHomeNumber] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  return (
    <div className="card-body h-full">
      <h2 className="card-title">Add a client</h2>
      <form
        action={createAction}
        method="post"
        className="flex flex-col space-y-4"
      >
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
          Add Client
        </button>
      </form>
    </div>
  );
}
