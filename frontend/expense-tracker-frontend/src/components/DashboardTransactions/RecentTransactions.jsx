import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";

// is a popular JavaScript library used for formatting dates, parsing dates, manipulating dates, and displaying dates in a readable format.

import TransactionInfoCard from "../../cards/TransactionInfoCard";
import "../../css/RecentTransactions.css";
const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="transaction-card">
      <div className="transaction-head">
        <h5>Recent Transactions</h5>
        <button onClick={onSeeMore}>
          See All
          <LuArrowRight size={"17px"} />
        </button>
      </div>
      <div className="transaction-data">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item.id}
            title={item.description}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
