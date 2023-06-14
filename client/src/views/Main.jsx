import { useEffect } from "react";
import { _getSecureLs, _removeAll } from "../utils/storage";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  useEffect(() => {
    const expiryDate = _getSecureLs("auth")?.expiryDate;

    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    setAutoLogout(remainingMilliseconds);
  }, []);

  const setAutoLogout = (remainingTime) => {
    setTimeout(() => {
      _removeAll();
      navigate("/");
    }, remainingTime);
  };

  return <div>Main</div>;
}

export default Main;
