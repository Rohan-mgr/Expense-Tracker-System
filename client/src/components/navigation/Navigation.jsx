import { NavLink } from "react-router-dom";
import NameInitials from "../nameinitials/NameInitials";
import { CiViewTimeline } from "react-icons/ci";
import { MdMoney } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { TbPigMoney, TbGraph } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { _remove, getLoggedUser, _setSecureLs } from "../../utils/storage";
import { handlegoogleAuthLogout } from "../../services/auth";

function Navigation() {
  const navigate = useNavigate();
  const loggedUser = getLoggedUser();

  const handleLogOut = async () => {
    try {
      if (loggedUser?.googleId) {
        console.log("logout");
        await handlegoogleAuthLogout();
      }
      _remove("auth");
      _setSecureLs("oauth", { callGoogleUser: false });
      navigate("/");
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <nav>
      <div className="name__initials__wrapper">
        <NameInitials name={loggedUser?.firstName} />
        <div>
          <p>
            {loggedUser?.firstName} {loggedUser?.lastName}
          </p>
          <p>{loggedUser?.email}</p>
        </div>
      </div>
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => isActive && "active"}
          >
            <TbGraph /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/view-transaction"
            className={({ isActive }) => isActive && "active"}
          >
            <CiViewTimeline /> View Transaction
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/expense"
            className={({ isActive }) => isActive && "active"}
          >
            <MdMoney /> Expense
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/income"
            className={({ isActive }) => isActive && "active"}
          >
            <TbPigMoney /> Income
          </NavLink>
        </li>
      </ul>
      <div className="nav__btn__wrapper">
        <button onClick={handleLogOut}>
          <HiOutlineLogout /> Sign Out
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
