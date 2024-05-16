export interface SideNavItem {
  title: string;
  path: string;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
}