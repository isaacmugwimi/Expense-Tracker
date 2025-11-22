import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverView = ({ totalIncome, totalBalance, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expense", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];
  console.log("Balance:", totalBalance);
  console.log("Income:", totalIncome);
  console.log("Expense:", totalExpense);
  console.log(balanceData);

  return (
    <div className="finace-overview-main-section">
      <div className="finance-overview">
        <h5>Finance Overview</h5>
        <div className="pieChart">
          <CustomPieChart
            data={balanceData}
            label="Total Balance"
            totalAmount={`Ksh. ${totalBalance}`}
            colors={COLORS}
            showTextAnchor
          />
        </div>
      </div>
    </div>
  );
};

export default FinanceOverView;
