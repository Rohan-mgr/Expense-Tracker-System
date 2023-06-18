import { FaMoneyBillAlt, FaLaptopCode, FaBitcoin } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { AiOutlineStock } from "react-icons/ai";
import { BsBank, BsYoutube } from "react-icons/bs";
import { GiChoice } from "react-icons/gi";

function IncomeIcon(category) {
  let Icon;
  switch (category) {
    case "salary":
      Icon = <FaMoneyBillAlt />;
      break;
    case "freelancing":
      Icon = <FaLaptopCode />;
      break;
    case "investments":
      Icon = <TbMoneybag />;
      break;
    case "stocks":
      Icon = <AiOutlineStock />;
      break;
    case "bitcoin":
      Icon = <FaBitcoin />;
      break;
    case "banktransfer":
      Icon = <BsBank />;
      break;
    case "youtube":
      Icon = <BsYoutube />;
      break;
    case "other":
      Icon = <GiChoice />;
      break;
    default:
      Icon = null;
      break;
  }
  return Icon;
}
export default IncomeIcon;
