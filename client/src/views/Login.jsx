import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { handleUserSignin } from "../services/auth";
import { signInFormValidation } from "../validation-schema/validation";
import { _setSecureLs } from "../utils/storage";
import Alert from "../components/Alert/Alert";
import { FaUserAlt } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await handleUserSignin(values);
        console.log(response?.message);
        setStatus((prevState) => {
          return {
            ...prevState,
            message: response?.message,
            status: response?.status,
          };
        });

        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        _setSecureLs("auth", {
          isLoggedIn: true,
          token: response?.token,
          user: response?.loggedUser,
          expiryDate: expiryDate.toISOString(),
        });
        navigate("/admin/dashboard");
      } catch (error) {
        setStatus({ message: error });
        throw new Error(error);
      } finally {
        resetForm();
      }
    },
    validationSchema: signInFormValidation,
  });

  return (
    <div className="login">
      <h1>Welcome To Expense Tracer System</h1>
      <Form onSubmit={formik.handleSubmit}>
        <div className="login__icon__wrapper">
          <FaUserAlt />
        </div>
        {status && (
          <Alert
            status
            SetStatus={setStatus}
            Variant={status?.status ? "success" : "danger"}
          >
            {status.message}
          </Alert>
        )}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.email && formik.touched.email}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="invalid-feedback">{formik.errors.email}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.password && formik.touched.password}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="invalid-feedback">{formik.errors.password}</div>
          )}
        </Form.Group>
        <Button variant="dark" type="submit" className="w-100">
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
