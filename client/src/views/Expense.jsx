import "../assets/css/expense_income.css";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MdAddCircleOutline } from "react-icons/md";
import { useFormik } from "formik";
import { handleAddExpenses, deleteExpense } from "../services/transaction";
import { getLoggedUser } from "../utils/storage";
import useFetchAllExpenses from "../hooks/useFetchAllExpenses";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import Card from "../components/card/card";
import { expenseCategory } from "../utils/categories";

function Expense() {
  const navigate = useNavigate();
  const { id } = getLoggedUser();
  const { isLoading, expenses, setExpensesLists } = useFetchAllExpenses(id);

  const getTotal = () => {
    const amounts = expenses.map((e) => e?.amount);
    return amounts.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  };

  const handleExpenseDelete = async (id) => {
    console.log("clicked", id);
    try {
      const response = await deleteExpense(id);
      console.log(response);

      const updatedExpensesList = expenses?.filter(
        (e) => e?.id !== response?.deletedExpense?.id
      );

      setExpensesLists(updatedExpensesList);
      navigate("/expense");
    } catch (error) {
      throw new Error(error);
    }
  };

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
          return [response?.newExpense, ...prevState].reverse();
        });
        navigate("/expense");
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
          Total Expenses: <strong>${getTotal()}</strong>
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
                {expenseCategory?.map((e) => {
                  return (
                    <option key={e?.value} value={e?.value}>
                      {e?.category}
                    </option>
                  );
                })}
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
        <div className="col-12 col-md-8 col-lg-8 mt-4 card__container">
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <Spinner animation="border" variant="dark" />
            </div>
          ) : expenses?.length > 0 ? (
            expenses?.reverse()?.map((e) => {
              return (
                <Card
                  key={e?.id}
                  category={e?.categoryName}
                  date={e?.expenseDate}
                  amount={e?.amount}
                  title={e?.title}
                  isExpenses
                  func={() => handleExpenseDelete(e?.id)}
                />
              );
            })
          ) : (
            <p style={{ textAlign: "center" }}>No Expenses List Found!</p>
          )}
        </div>
      </Row>
    </Container>
  );
}

export default Expense;
