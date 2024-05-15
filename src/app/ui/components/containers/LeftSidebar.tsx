"use client";
import Link from "next/link";
import { useState } from "react";

const routes = [
  {path: "/pages/Login",
   name: "Login Page"
  },
  {path: "/pages/Register",
  name: "Register Page"
 },
]



export default function LeftSideBar()
{

  return(
<div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay" /> 
    <li className="mb-2 font-semibold text-xl">
     <Link href="/pages/Login"><img className="w-16 rounded-xl" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="DashWind Logo"/>Home Page</Link> </li>
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}

      {routes.map((route, index) => (
        <li key={index}>
          <Link key={index} href={route.path}>
        {route.name}
        </Link>
        </li>
      ))}
    </ul>




  </div>
</div>
  );
}
