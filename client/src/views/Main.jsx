import { useEffect } from "react";
import { _getSecureLs, _removeAll, getLoggedUser } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import Misc from "../utils/misc";
import Chart from "../components/linechart/LineChart";

function Main() {
  const { id } = getLoggedUser();
  const navigate = useNavigate();
  const {
    totalExpense,
    totalIncome,
    lowestExpense,
    highestExpense,
    lowestIncome,
    highestIncome,
    recentTransactions,
  } = Misc(id);

  console.log(recentTransactions);

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

  return (
    <Container fluid>
      <h4>Dashboard</h4>
      <Row>
        <div className="col-12 col-md-7 col-lg-7">
          <p className="recent__history__heading">All Transactions</p>
          <div className="chart__wrapper">
            <Chart />
          </div>
          <div className="amounts__wrapper mt-3">
            <div className="amounts">
              <span>Total Income</span>
              <p
                style={{
                  fontWeight: "700",
                  fontSize: "1.2rem",
                  color: "green",
                }}
              >
                $ {totalIncome}
              </p>
            </div>
            <div className="amounts">
              <span>Total Expense</span>
              <p
                style={{
                  fontWeight: "700",
                  fontSize: "1.2rem",
                  color: "crimson",
                }}
              >
                $ {totalExpense}
              </p>
            </div>
          </div>
          <div className="amounts__wrapper">
            <div className="amounts">
              <span>Remaining Balance</span>
              <p
                style={{
                  fontWeight: "700",
                  fontSize: "1.5rem",
                  color: `${
                    totalIncome - totalExpense > 1 ? "green" : "crimson"
                  }`,
                }}
              >
                $ {totalIncome - totalExpense}
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-5 col-lg-5">
          <p className="recent__history__heading">Recent History</p>
          <div className="recent__history__wrapper">
            <div className="recent__history">
              {recentTransactions?.length < 1 ? (
                <h4 className="text-center my-4">No Transactions found!</h4>
              ) : (
                recentTransactions?.map((t) => {
                  return (
                    <p
                      key={t?.id}
                      style={{
                        color: `${t?.type === "expense" ? "crimson" : "green"}`,
                      }}
                    >
                      <span>{t?.title}</span> <span>$ {t?.amount}</span>
                    </p>
                  );
                })
              )}
            </div>
          </div>
          <div></div>
          <div className="salary__expense__info__wrapper">
            <div className="salary__expense__class">
              <span>Min</span>
              <p>Expense</p>
              <span>Max</span>
            </div>
            <div className="salary__expense__info">
              <p>$ {lowestExpense || 0}</p>
              <p>$ {highestExpense || 0}</p>
            </div>
          </div>
          <div className="salary__expense__info__wrapper">
            <div className="salary__expense__class">
              <span>Min</span>
              <p>Income</p>
              <span>Max</span>
            </div>
            <div className="salary__expense__info">
              <p>$ {lowestIncome || 0}</p>
              <p>$ {highestIncome || 0}</p>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default Main;
