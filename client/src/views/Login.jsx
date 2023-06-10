import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <div className="login">
      <h1>Welcome To Expense Tracer System</h1>
      <Form>
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
        <Form.Group className="mt-3" controlId="formBasicPassword">
          <Form.Label>
            Are you new here?{" "}
            <span onClick={() => navigate("/signup")}>
              <strong>Sign Up</strong>
            </span>
          </Form.Label>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Login;
