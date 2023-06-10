import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="page__not__found">
      <h1>{"{404}"}</h1>
      <p onClick={() => navigate("/")}>
        <strong>
          <BsArrowLeft /> Go Back
        </strong>
      </p>
    </div>
  );
}

export default PageNotFound;
