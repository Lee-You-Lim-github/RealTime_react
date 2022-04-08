import { Link } from "react-router-dom";
import noimages from "assets/img/noimages.png";

function PickComponent({ pick_obj }) {
  return (
    <div className="h-36 max-w-md mb-7 border border-stone-300 rounded overflow-hidden hover:-translate-y-1">
      <div className="grid grid-cols-3 place-items-center">
        {!pick_obj?.shop_id.photo1 ? (
          <img className="w-full h-36" src={noimages} alt="no_images" />
        ) : (
          <img
            className="w-full h-36"
            src={pick_obj.shop_id.photo1}
            alt={pick_obj.shop_id.name}
          />
        )}

        <div className="col-span-2 auto-rows-max px-6 py-4">
          <Link
            to={`/shop/${pick_obj.shop_id.id}/`}
            className="font-bold text-xl mb-2 hover:underline"
          >
            {pick_obj.shop_id.name}
          </Link>
          <div className="text-gray-700 text-base">
            {pick_obj.shop_id.address}
          </div>
          <div className="text-gray-700 text-base">
            {pick_obj.shop_id.telephone}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PickComponent;
