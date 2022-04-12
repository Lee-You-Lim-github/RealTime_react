import React from "react";

function AdminwaitingSummary({ wait, index }) {
  return (
    <React.Fragment>
      {/* <DebugStates waiting_obj={waiting_obj} /> */}
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-800 whitespace-no-wrap">{index + 1}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-800 whitespace-no-wrap">
            {wait.shop_id.shop_num}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-800 whitespace-no-wrap">
            {wait.shop_id.name}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-800 whitespace-no-wrap">
            {wait.user_id.user_id}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-800 whitespace-no-wrap">
            {wait.user_id.username}
          </p>
        </td>
        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {wait.wait_date.slice(0, 10)}
          </p>
        </td>
        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {wait.wait_date.slice(11, 16)}
          </p>
        </td>
        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {wait.wait_table_count}
          </p>
        </td>
        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="text-gray-900 whitespace-no-wrap">
            {wait.wait_visit_status === "1" ? (
              <div>방문</div>
            ) : wait.wait_visit_status === "2" ? (
              <div>미방문</div>
            ) : (
              <div>방문예정</div>
            )}
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default AdminwaitingSummary;

{
  /* <div>
      <div>
        <div>{index + 1}</div>
        <div>{wait.shop_id.shop_num}</div>
        <div>{wait.shop_id.name}</div>
        <div>{wait.user_id.user_id}</div>
        <div>{wait.user_id.username}</div>
        <div>{wait.user_id.telephone}</div>
        <div>{wait.wait_date.slice(0, 10)}</div>
        <div>{wait.wait_date.slice(11, 16)}</div>

        <div>{wait.wait_table_count}</div>
        <div>
          <div>{wait.wait_visit_status === "1" && <div>방문</div>}</div>
          <div>{wait.wait_visit_status === "0" && <div>방문예정</div>}</div>
        </div>
        <div>-------------------------------------</div>
      </div>
    </div> */
}
