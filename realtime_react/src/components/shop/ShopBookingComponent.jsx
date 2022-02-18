import React from "react";

function ShopBookingComponent({
  shop_booking,
  clickedVisit,
  clickedUnvisited,
  loading,
}) {
  return (
    <React.Fragment>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-gray-900 whitespace-no-wrap">
                {shop_booking.id}
              </p>
            </div>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {shop_booking.user_id.username}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {shop_booking.user_id.telephone}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{shop_booking.day}</p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {shop_booking.time.slice(0, 5)}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {shop_booking.book_table_count}
          </p>
        </td>
        <td className="p-3 px-5 flex justify-end">
          <button
            type="button"
            disabled={loading}
            onClick={() => clickedVisit(shop_booking.id)}
            class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            방문
          </button>
          <button
            type="button"
            onClick={() => clickedUnvisited(shop_booking.id)}
            disabled={loading}
            class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            미방문
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default ShopBookingComponent;
