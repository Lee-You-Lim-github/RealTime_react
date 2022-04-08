import React from "react";
import warning from "assets/img/warning1.png";
import { Link } from "react-router-dom";

function PageNotShopUser() {
  return (
    <div className="flex flex-col">
      <div className="ml-8">
        <img className="ml-72 px-7 max-w-4xl h-50" alt="warn" src={warning} />
      </div>
      <div className="text-4xl pt-11">We Are Sorry...</div>
      <div className="text-xl pt-3">Please register a store 😥</div>
      <Link
        to={`/shop/new/`}
        className="text-2xl text-orange-400 hover:text-stone-300 pt-6"
      >
        가맹점 등록 🙌
      </Link>
    </div>
  );
}

export default PageNotShopUser;
