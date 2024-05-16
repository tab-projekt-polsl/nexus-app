
import React from 'react';
import { Suspense } from "react";
import Header from "./Header"
import SuspenseContent from "./SuspenseContent";
import Login from '@/app/pages/login/page';
import Dashboard from '@/app/pages/dashboard/page';
import Register from '@/app/pages/register/page';
import Requests from '@/app/pages/requests/page';

const routes = [
  {path: "/pages/dashboard",
  name: "Register Page",
  component: Dashboard
 },
 {path: "/pages/requests",
 name: "Requests Page",
 component: Requests
},
  {path: "/pages/login",
   name: "Login Page",
   component: Login
  },
  {path: "/pages/register",
  name: "Register Page",
  component: Register
 },
]



interface PageContentProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}


const PageContent: React.FC<PageContentProps> = ({ selectedTab }) => {
  return (
    <div className="drawer-content flex flex-col ">
      <Header />
      <main className="bg-blue-200 flex-1 overflow-y-auto md:pt-4 pt-4 px-6  bg-base-200">
        <Suspense fallback={<SuspenseContent />}>
        <div>
    {routes.map(route => (
      selectedTab === route.path && <div key={route.path}><route.component /></div>
    ))}
  </div>
        </Suspense>
        <div className="h-16" />
      </main>
    </div>
  );
}

export default PageContent;