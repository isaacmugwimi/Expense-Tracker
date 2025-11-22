import {
  LuTrash2,
  LuTrendingDown,
  LuTrendingUp,
  LuUtensils,
} from "react-icons/lu";
import "../css/TransactionInfoCard.css";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
}) => {
  return (
    <div className="main-section">
      <div className="transaction">
        <div className="transaction-icons">
          {icon ? <img src={icon} alt={title} className="" /> : <LuUtensils />}
        </div>
        <div className="transaction-left">
          <div className="title-date-section">
            <p className="title">{title}</p>
            <p className="date">{date}</p>
          </div>
          <div className="delete-amount-section">
            {/* {!hideDeleteBtn && ( */}
              <button className="deletebtn">
                <LuTrash2 size={18} />
              </button>
            {/* )} */}
            <div
              className={`amount-section ${
                type == "income" ? "green-Background" : "red-Background"
              }`}
            >
              <h6>
                {type === "income" ? "+" : "-"}Ksh. {amount}
              </h6>
              {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
