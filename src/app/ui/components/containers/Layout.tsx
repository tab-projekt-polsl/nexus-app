
import LeftSideBar from "./LeftSidebar";
import PageContent from "./PageContent";




export default function Layout()
{

return(
  <div className="drawer  lg:drawer-open">
  <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
  <PageContent/>
  <LeftSideBar/>
</div>
);

}