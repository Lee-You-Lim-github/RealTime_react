import warning from "assets/img/warning1.png";
import { Link } from "react-router-dom";

function PageShopNot() {
  return (
    <div className="flex flex-col">
      <div className="">
        <img className="w-250 h-50" alt="warn" src={warning} />
      </div>
      <div className="text-4xl pt-11">We Are Sorry...</div>
      <div className="text-xl pt-3">Please login as an individual member</div>
      <Link to={`/`} className="text-violet-600 hover:text-red-300 pt-10">
        Go Back
      </Link>
    </div>
  );
}

export default PageShopNot;
