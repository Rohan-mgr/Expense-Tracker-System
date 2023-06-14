// import React, { useState, useEffect } from "react";
// import "./LineChart.css";
// import axios from "../../axios-instance";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Misc from "../../utils/misc";
import { getLoggedUser } from "../../utils/storage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

function Chart() {
  const { id } = getLoggedUser();
  const { expenses, incomes } = Misc(id);

  const data = {
    labels: expenses.map((e) => new Date(e?.expenseDate).toLocaleDateString()),
    datasets: [
      {
        label: "Expense",
        data: expenses.map((e) => e?.amount),
        borderColor: "red",
        tension: 0.4,
      },
      {
        label: "Income",
        data: incomes.map((e) => e?.amount),
        borderColor: "green",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="chart__wrapper">
      <Line options={options} data={data} />
    </div>
  );
}

export default Chart;
