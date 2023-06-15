import ProgressBar from "../components/progressbar/ProgressBar";
import { Container, Row } from "react-bootstrap";
import useFetchAllExpenses from "../hooks/useFetchAllExpenses";
import useFetchAllIncomes from "../hooks/useFetchAllIncomes";
import Spinner from "react-bootstrap/Spinner";
import { getLoggedUser } from "../utils/storage";
import { expenseCategory, incomeCategory } from "../utils/categories";

function Transaction() {
  const { id } = getLoggedUser();
  const { isLoading, expenses } = useFetchAllExpenses(id);
  const { incomes } = useFetchAllIncomes(id);
  console.log(expenses);

  return (
    <Container fluid>
      <h4>Transactions</h4>
      <Row>
        <div className="col-12 col-md-6 col-lg-6 mt-4">
          <p className="recent__history__heading h3">Expenses Categories</p>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <Spinner animation="border" variant="dark" />
            </div>
          ) : expenseCategory?.length > 0 ? (
            expenseCategory?.reverse()?.map((e) => {
              return (
                <ProgressBar
                  key={e?.id}
                  category={e?.category}
                  transactions={expenses}
                />
              );
            })
          ) : (
            <p style={{ textAlign: "center" }}>No Expenses List Found!</p>
          )}
        </div>
        <div className="col-12 col-md-6 col-lg-6 mt-4">
          <p className="recent__history__heading h3">Incomes Categories</p>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <Spinner animation="border" variant="dark" />
            </div>
          ) : incomeCategory?.length > 0 ? (
            incomeCategory?.reverse()?.map((e) => {
              return (
                <ProgressBar
                  key={e?.id}
                  category={e?.category}
                  transactions={incomes}
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

export default Transaction;
