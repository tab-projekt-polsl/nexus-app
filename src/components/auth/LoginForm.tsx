"use client";
import React, { useState } from "react";
import { serialize } from "cookie";
import { useRouter } from "next/navigation";

interface Props {
  loginAction: any;
}

export default function LoginForm({ loginAction }: Props) {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("uname", uname);
    formData.append("password", password);

    try {
      const { token, role, id } = await loginAction(formData);
      document.cookie = serialize("auth", token, {
        path: "/",
        maxAge: 3600, // 1 hour
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });
      document.cookie = serialize("role", role, {
        path: "/",
        maxAge: 3600, // 1 hour
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });
      document.cookie = serialize("id", id, {
        path: "/",
        maxAge: 3600, // 1 hour
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });
      router.push("/");
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Log in</h2>
          <form onSubmit={handleSubmit} className="">
            {error && <p className="text-red-500">{error}</p>}
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
            <button type="submit" className="btn btn-primary mt-5 w-full">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
