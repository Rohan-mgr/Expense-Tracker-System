import { FaGlobeAsia } from "react-icons/fa";
import { RiTakeawayFill } from "react-icons/ri";
import { GiClothes, GiChoice } from "react-icons/gi";
import { BsBookFill } from "react-icons/bs";
import {
  MdSubscriptions,
  MdHealthAndSafety,
  MdLocalGroceryStore,
} from "react-icons/md";

function ExpenseIcon(category) {
  let Icon;
  switch (category) {
    case "travelling":
      Icon = <FaGlobeAsia />;
      break;
    case "education":
      Icon = <BsBookFill />;
      break;
    case "subscriptions":
      Icon = <MdSubscriptions />;
      break;
    case "health":
      Icon = <MdHealthAndSafety />;
      break;
    case "groceries":
      Icon = <MdLocalGroceryStore />;
      break;
    case "takeaways":
      Icon = <RiTakeawayFill />;
      break;
    case "clothing":
      Icon = <GiClothes />;
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
export default ExpenseIcon;
