"use client";
import Link from "next/link";
import { useState } from "react";
import React from 'react';
const routes = [
  {path: "/pages/dashboard",
  name: "Dashboard Page"
 },
 {path: "/pages/requests",
 name: "Requests Page"
},
  {path: "/pages/login",
   name: "Login Page"
  },
  {path: "/pages/register",
  name: "Register Page"
 },
]


interface LeftSidebarProps {
  onSelectTab: (tab: string) => void;
}


const LeftSidebar: React.FC<LeftSidebarProps> = ({onSelectTab}) =>{
  const handleTabClick = (tab: string) => {
    onSelectTab(tab);
  };
  return(
<div className="bg-blue-600 drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className=" drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay" /> 
    <li className="mb-2 font-semibold text-xl">
     <Link href="/pages/login"><img className="w-16 rounded-xl" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="DashWind Logo"/>Home Page</Link> </li>
    <ul className="bg-blue-400  menu p-4 w-50 min-h-full  text-base-content">
      {/* Sidebar content here */}

      {routes.map((route, index) => (
        <li key={index}>
        <button className="btn btn-outline btn-neutral mb-6" onClick={() => handleTabClick(route.path)}>{route.name}</button>  
        </li>
      ))}
    </ul>
  </div>
</div>
  );
};
export default LeftSidebar;