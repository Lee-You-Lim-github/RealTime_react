import { Link } from "react-router-dom";

function truncateString(str) {
  if (str.length > 30) {
    return str.slice(0, 30) + "...";
  } else {
    return str;
  }
}

function QnaSummary({ qna, index }) {
  return (
    <>
      <tbody className="w-full">
        <tr>
          <td className="p-5 w-30 pr-20 text-justify">{index + 1}</td>
          <td className="p-5 w-96 pl-50  text-center">
            <Link to={`/user/${qna.user_id.id}/qna/${qna.id}/`}>
              {truncateString(qna.title)}
            </Link>
          </td>
          <td className="p-5 w-96">{qna.registered_date}</td>
          <td className="text-right p-5 w-20 pr-10">
            {qna.answer ? <> ✔</> : <> ✖ </>}
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default QnaSummary;
