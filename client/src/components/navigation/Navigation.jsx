import { NavLink } from "react-router-dom";
import NameInitials from "../nameinitials/NameInitials";

function Navigation() {
  return (
    <nav>
      <div className="name__initials__wrapper">
        <NameInitials name="Mohan Rana Magar" />
        <div>
          <p>Mohan Rana Magar</p>
          <p>mohan@gmail.com</p>
        </div>
      </div>
      <ul>
        <li>
          <NavLink
            to="dashboard"
            className={({ isActive }) => isActive && "active"}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="view-transaction"
            className={({ isActive }) => isActive && "active"}
          >
            View Transaction
          </NavLink>
        </li>
        <li>
          <NavLink
            to="expense"
            className={({ isActive }) => isActive && "active"}
          >
            Expense
          </NavLink>
        </li>
        <li>
          <NavLink
            to="income"
            className={({ isActive }) => isActive && "active"}
          >
            Income
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
