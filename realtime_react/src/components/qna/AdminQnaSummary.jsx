import { Link } from "react-router-dom";
import React from "react";

function truncateString(str) {
  if (str.length > 30) {
    return str.slice(0, 30) + "...";
  } else {
    return str;
  }
}

function AdminQnaSummary({ qna, index }) {
  return (
    <React.Fragment>
      <tr>
        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
            </div>
          </div>
        </td>
        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {qna.user_id.authority === "0" && <div>개인</div>}
          </p>
          <p className="text-gray-900 whitespace-no-wrap">
            {qna.user_id.authority === "1" && <div>사업자</div>}
          </p>
        </td>
        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
          <Link to={`/admin/${qna.user_id.id}/qna/${qna.id}/`}>
            {truncateString(qna.title)}
          </Link>
        </td>
        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {qna.registered_date}
          </p>
        </td>
        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {qna.answer ? <> ✔</> : <> ✖ </>}
          </p>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default AdminQnaSummary;
