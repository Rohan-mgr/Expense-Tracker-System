import { Navigate } from "react-router-dom";
// import { _getSecureLs } from "../../helper/storage";

function PrivateRoute({ children }) {
  //   const { isLoggedIn } = _getSecureLs("auth");
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default PrivateRoute;
