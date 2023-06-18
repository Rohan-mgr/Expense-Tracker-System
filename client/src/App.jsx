import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import Main from "./views/Main";
import Transaction from "./views/Transaction";
import Expense from "./views/Expense";
import Income from "./views/Income";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import PrivateRoute from "./components/privateroute/PrivateRoute";
import PageNotFound from "./views/404";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          // path="/admin"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Main />} />
          <Route path="/view-transaction" element={<Transaction />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/income" element={<Income />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
