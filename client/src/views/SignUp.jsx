import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="login">
      <h1>Welcome To Expense Tracer System</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Form.Group className="mt-3 text-center" controlId="formBasicPassword">
          <Form.Label>
            <span onClick={() => navigate("/")}>
              <strong>
                <BsArrowLeft /> Back to login
              </strong>
            </span>
          </Form.Label>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SignUp;
