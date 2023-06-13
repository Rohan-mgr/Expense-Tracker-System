import "../assets/css/expense_income.css";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MdAddCircleOutline } from "react-icons/md";
import { useFormik } from "formik";
import { handleAddExpenses } from "../services/transaction";
import { getLoggedUser } from "../utils/storage";
import useFetchAllExpenses from "../hooks/useFetchAllExpenses";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

function Expense() {
  const navigate = useNavigate();
  const { id } = getLoggedUser();
  const { isLoading, expenses, setExpensesLists } = useFetchAllExpenses();

  const formik = useFormik({
    initialValues: {
      expenseTitle: "",
      expenseAmount: "",
      expenseDate: "",
      expenseCategory: "",
      expenseNote: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await handleAddExpenses(values, id);
        console.log(response);

        setExpensesLists((prevState) => {
          return [...prevState, response?.newExpense];
        });
        navigate("/admin/expense");
      } catch (error) {
        throw new Error(error);
      } finally {
        resetForm();
      }
    },
  });

  return (
    <Container fluid>
      <h4>Expenses</h4>
      <div className="expense__income__header">
        <h5>
          Total Expenses: <strong>$564</strong>
        </h5>
      </div>
      <Row>
        <div className="col-12 col-md-4 col-lg-4 mt-4">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="expenseTitle">
              <Form.Control
                type="text"
                name="expenseTitle"
                placeholder="Expense Title"
                required
                value={formik.values.expenseTitle}
                onChange={formik.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="expenseAmount">
              <Form.Control
                type="number"
                name="expenseAmount"
                placeholder="Expense Amount"
                required
                value={formik.values.expenseAmount}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="expenseAmount">
              <Form.Control
                type="date"
                name="expenseDate"
                placeholder="Expense Date"
                required
                value={formik.values.expenseDate}
                onChange={formik.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="expenseAmount">
              <Form.Control
                as="select"
                type="select"
                required
                name="expenseCategory"
                value={formik.values.expenseCategory}
                onChange={formik.handleChange}
              >
                <option value="">Expense Category</option>
                <option value="education">Education</option>
                <option value="groceries">Groceries</option>
                <option value="health">Health</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="takeaways">Takeaways</option>
                <option value="clothing">Clothing</option>
                <option value="travelling">Travelling</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="expenseAmount">
              <Form.Control
                as="textarea"
                placeholder="Expense Note"
                name="expenseNote"
                style={{
                  height: "100px",
                  resize: "none",
                }}
                value={formik.values.expenseNote}
                onChange={formik.handleChange}
                required
              />
            </Form.Group>

            <Button variant="danger" type="submit">
              <MdAddCircleOutline />
              Add Expense
            </Button>
          </Form>
        </div>
        <div className="col-12 col-md-8 col-lg-8">
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <Spinner animation="border" variant="dark" />
            </div>
          ) : expenses?.length > 0 ? (
            expenses?.reverse()?.map((e) => {
              return <p key={e?.id}>{e?.categoryName}</p>;
            })
          ) : (
            <p style={{ textAlign: "center" }}>No Projects Found!</p>
          )}
        </div>
      </Row>
    </Container>
  );
}

export default Expense;
