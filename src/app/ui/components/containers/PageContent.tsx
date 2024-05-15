import { useRouter } from 'next/router';
import React from 'react';
import { Suspense } from "react";
import Header from "./Header"
import LeftSideBar from "./LeftSidebar";
import SuspenseContent from "./SuspenseContent";
import Login from '@/app/pages/Login/page';
import Link from "next/link";
const routes = [
  {path: "/pages/Login",
   name: "Login Page"
  },
  {path: "/pages/Register",
  name: "Register Page"
 },
]




export default function PageContent()
{

  return(
    <div className="drawer-content flex flex-col ">
    <Header/>
    <main className=" bg-red-200 flex-1 overflow-y-auto md:pt-4 pt-4 px-6  bg-base-200">
        <Suspense fallback={<SuspenseContent/>}>
          {/* WYWOLANIE WYBRANEJ W LeftSideBar strony */}
      <Login/>
        </Suspense>
        <div className="h-16" />
    </main>
</div> 
  );
}