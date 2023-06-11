import { Navigate } from "react-router-dom";
import { _getSecureLs } from "../../utils/storage";

function PrivateRoute({ children }) {
  const { isLoggedIn } = _getSecureLs("auth");
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default PrivateRoute;
