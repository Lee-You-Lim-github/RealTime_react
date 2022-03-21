import { Link } from "react-router-dom";

function PickComponent({ pick_obj }) {
  return (
    <>
      <div className="max-w-sm my-2 rounded overflow-hidden shadow-lg hover:-translate-y-1">
        <img
          className="w-full"
          src={pick_obj.shop_id.photo1}
          alt={pick_obj.shop_id.name}
        />
        <div className="px-6 py-4">
          <Link
            to={`/shop/${pick_obj.shop_id.id}/`}
            className="font-bold text-xl mb-2 hover:underline"
          >
            {pick_obj.shop_id.name}
          </Link>
          <p className="text-gray-700 text-base">{pick_obj.shop_id.address}</p>
          <p className="text-gray-700 text-base">
            {pick_obj.shop_id.telephone}
          </p>
        </div>
      </div>
    </>
  );
}

export default PickComponent;
