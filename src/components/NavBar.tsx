import { BsBoxArrowRight } from "react-icons/bs";

export default function NavBar() {
  return (
    <div className="navbar bg-base-100">
      <div className=" flex-wrap">
        <a className="btn btn-ghost text-xl">nexus</a>{" "}
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/requests/board">Requests</a>
          </li>
          <li>
            <a href="/activities/board">Activities</a>
          </li>
          <li>
            <a href="/management">Management</a>
          </li>
        </ul>
      </div>
      <div className="flex-1 justify-end text-xl mr-4">
        <BsBoxArrowRight />
      </div>
    </div>
  );
}
