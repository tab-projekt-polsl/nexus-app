"use client";
import Cookies from "js-cookie";
import { BsBoxArrowRight } from "react-icons/bs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const pathName = usePathname();
  const logout = () => {
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };
  const isLoggedIn = !!Cookies.get("auth");
  if (!isLoggedIn) {
    if (pathName !== "/login") {
      router.push("/login");
    }
    return null;
  }
  return (
    <div className="navbar bg-base-100 fixed z-40">
      <div className=" flex-wrap">
        <Link className="btn btn-ghost text-xl" href="/">
          nexus
        </Link>{" "}
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/requests/board">Requests</Link>
          </li>
          <li>
            <Link href="/activities/board">Activities</Link>
          </li>
          <li>
            <Link href="/management">Management</Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 justify-end text-xl mr-4">
        <button className="btn btn-ghost" onClick={logout}>
          <BsBoxArrowRight />
        </button>
      </div>
    </div>
  );
}
