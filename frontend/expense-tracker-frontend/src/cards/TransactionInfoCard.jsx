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
  hideDeleteBtn,
}) => {
  return (
    <div className="main-section">
      <div className="transaction">
        <div className="transaction-icons">
          {icon ? <img src={icon} alt={title} className="" /> : <LuUtensils />}
        </div>
        <div className="transaction-data">
          <div>
            <p>{title}</p>
            <p>{date}</p>
          </div>
          <div className="">
            {!hideDeleteBtn && (
              <button>
                <LuTrash2 size={18} />
              </button>
            )}
            <div className="">
              <h6>
                {type === "income" ? "+" : "-"}${amount}
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
