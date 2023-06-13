import { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function Dashboard() {
  const [showSideNav, SetShowSideNav] = useState(true);
  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem("")
  }, []); 
  return (
    <div className="dashboard">
      {showSideNav && (
        <aside>
          <Navigation />
        </aside>
      )}
      <main>
        <div
          className={`dashboard__toggle__btn ${!showSideNav && "move-btn"}`}
          onClick={() => SetShowSideNav(!showSideNav)}
        >
          <FaBars />
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
