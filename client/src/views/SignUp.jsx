import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useFormik } from "formik";
import { signUpFormValidation } from "../validation-schema/validation";
import { handleUserSignup } from "../services/auth";
import { FaUserAlt } from "react-icons/fa";
import Typewriter from "typewriter-effect";

function SignUp() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await handleUserSignup(values);
        console.log(response?.message);
        navigate("/");
      } catch (error) {
        throw new Error(error);
      } finally {
        resetForm();
      }
    },
    validationSchema: signUpFormValidation,
  });

  return (
    <div className="login">
      <Typewriter
        options={{
          strings: [
            "<h1 style='text-align: center;margin-bottom: 2rem'>Welcome To Expense Tracer System</h1>",
          ],
          autoStart: true,
          loop: true,
        }}
      />
      <Form onSubmit={formik.handleSubmit}>
        <div className="login__icon__wrapper">
          <FaUserAlt />
        </div>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="fName"
            placeholder="Enter first name"
            value={formik.values.fName}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.fName && formik.touched.fName}
          />
          {formik.errors.fName && formik.touched.fName && (
            <div className="invalid-feedback">{formik.errors.fName}</div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lName"
            placeholder="Enter last name"
            value={formik.values.lName}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.lName && formik.touched.lName}
          />
          {formik.errors.lName && formik.touched.lName && (
            <div className="invalid-feedback">{formik.errors.lName}</div>
          )}
        </Form.Group>
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
