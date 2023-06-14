import { RxDotFilled } from "react-icons/rx";
import { BsCalendar2DateFill, BsFillDashCircleFill } from "react-icons/bs";
import { MdOutlineSubtitles } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import ExpenseIcon from "./ExpenseIcon";
import IncomeIcon from "./IncomeIcon";

function Card({ category, date, title, amount, isExpenses, func }) {
  return (
    <div className="expense__income__card">
      <div className="card__icon__wrapper">
        {isExpenses ? ExpenseIcon(category) : IncomeIcon(category)}
      </div>
      <div className="card__content">
        <p>
          <RxDotFilled
            style={{
              fontSize: "1.8rem",
              marginTop: "-4px",
              marginLeft: "-8px",
              color: isExpenses ? "crimson" : "green",
            }}
          />{" "}
          {category.toUpperCase()}
        </p>
        <div className="card__details">
          <span>
            <AiFillDollarCircle style={{ marginTop: "-4px" }} /> {amount}
          </span>
          <span>
            <BsCalendar2DateFill
              style={{
                marginTop: "-4px",
                marginRight: ".2rem",
                fontSize: ".8rem",
              }}
            />{" "}
            {new Date(date).toLocaleDateString()}
          </span>
          <span>
            <MdOutlineSubtitles
              style={{
                marginTop: "-4px",
                marginRight: ".2rem",
                fontSize: "1.1rem",
              }}
            />
            {title}
          </span>
        </div>
      </div>
      <div className="card__actions">
        <BsFillDashCircleFill style={{ fontSize: "1.5rem" }} onClick={func} />
      </div>
    </div>
  );
}

export default Card;
