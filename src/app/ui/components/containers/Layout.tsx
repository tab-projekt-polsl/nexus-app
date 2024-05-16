'use client'
import React, { useState } from 'react';
import LeftSideBar from "./LeftSidebar";
import PageContent from "./PageContent";



const Layout: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('/pages/Login');  // 'Default' page


  const handleSelectTab = (tab: string) => {
    setSelectedTab(tab);
    // router.push(`/your-route/${tab}`); 
    // Tutaj możesz użyć `next/router` do aktualizacji adresu URL
  };

return(
  <div className="drawer  lg:drawer-open">
  <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
  <PageContent selectedTab={selectedTab} />
  <LeftSideBar onSelectTab={handleSelectTab}/>
</div>
);

};
export default Layout;