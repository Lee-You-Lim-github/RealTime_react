import { Link } from "react-router-dom";

function QnaSummary({ qna, index }) {
  return (
    <div className="flex justify-center">
      <div>{index + 1}</div>
      <div>
        <Link to={`/user/${qna.user_id.id}/qna/${qna.id}/`}>{qna.title}</Link>
      </div>
      <div>{qna.registered_date}</div>
      <div>
        <div>{qna.answer && <div> ✔ </div>}</div>
        <div>{!qna.answer && <div> ✖ </div>}</div>
      </div>
    </div>
  );
}

export default QnaSummary;
