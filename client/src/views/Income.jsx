import "../assets/css/expense_income.css";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MdAddCircleOutline } from "react-icons/md";
import { useFormik } from "formik";
import { handleAddIncomes, deleteIncomes } from "../services/transaction";
import { getLoggedUser } from "../utils/storage";
import useFetchAllIncomes from "../hooks/useFetchAllIncomes";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import Card from "../components/card/card";
import { incomeCategory } from "../utils/categories";

function Income() {
  const navigate = useNavigate();
  const { id } = getLoggedUser();
  const { isLoading, incomes, setIncomesLists } = useFetchAllIncomes(id);

  const getTotal = () => {
    const amounts = incomes.map((i) => i?.amount);
    return amounts.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  };

  const handleIncomeDelete = async (id) => {
    console.log("clicked", id);
    try {
      const response = await deleteIncomes(id);
      console.log(response);

      const updatedIncomesList = incomes?.filter(
        (i) => i?.id !== response?.deletedIncome?.id
      );

      setIncomesLists(updatedIncomesList);
      navigate("/admin/income");
    } catch (error) {
      throw new Error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      incomeTitle: "",
      incomeAmount: "",
      incomeDate: "",
      incomeCategory: "",
      incomeNote: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values);
        const response = await handleAddIncomes(values, id);
        console.log(response);

        setIncomesLists((prevState) => {
          return [response?.newIncome, ...prevState].reverse();
        });
        navigate("/income");
      } catch (error) {
        throw new Error(error);
      } finally {
        resetForm();
      }
    },
  });

  return (
    <Container fluid>
      <h4>Income</h4>
      <div className="expense__income__header">
        <h5>
          Total Incomes:{" "}
          <strong style={{ color: "green" }}>${getTotal()}</strong>
        </h5>
      </div>
      <Row>
        <div className="col-12 col-md-4 col-lg-4 mt-4">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="expenseTitle">
              <Form.Control
                type="text"
                name="incomeTitle"
                placeholder="Income Title"
                required
                value={formik.values.incomeTitle}
                onChange={formik.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="incomeAmount">
              <Form.Control
                type="number"
                name="incomeAmount"
                placeholder="Income Amount"
                required
                value={formik.values.incomeAmount}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="incomeAmount">
              <Form.Control
                type="date"
                name="incomeDate"
                placeholder="Income Date"
                required
                value={formik.values.incomeDate}
                onChange={formik.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="incomeAmount">
              <Form.Control
                as="select"
                type="select"
                required
                name="incomeCategory"
                value={formik.values.incomeCategory}
                onChange={formik.handleChange}
              >
                <option value="">Income Category</option>
                {incomeCategory?.map((i) => {
                  return (
                    <option key={i?.value} value={i?.value}>
                      {i?.category}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="incomeAmount">
              <Form.Control
                as="textarea"
                placeholder="Income Note"
                name="incomeNote"
                style={{
                  height: "100px",
                  resize: "none",
                }}
                value={formik.values.incomeNote}
                onChange={formik.handleChange}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit">
              <MdAddCircleOutline />
              Add Income
            </Button>
          </Form>
        </div>
        <div className="col-12 col-md-8 col-lg-8 mt-4 card__container">
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <Spinner animation="border" variant="dark" />
            </div>
          ) : incomes?.length > 0 ? (
            incomes?.reverse()?.map((i) => {
              return (
                <Card
                  key={i?.id}
                  category={i?.categoryName}
                  date={i?.incomeDate}
                  amount={i?.amount}
                  title={i?.title}
                  func={() => handleIncomeDelete(i?.id)}
                />
              );
            })
          ) : (
            <p style={{ textAlign: "center" }}>No Income List Found!</p>
          )}
        </div>
      </Row>
    </Container>
  );
}

export default Income;
