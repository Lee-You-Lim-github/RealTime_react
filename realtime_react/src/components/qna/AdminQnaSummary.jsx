import { Link } from "react-router-dom";

function AdminQnaSummary({ qna, index }) {
  return (
    <div className="flex justify-center">
      <div>{index + 1}</div>
      <div>
        <div>{qna.user_id.authority === "0" && <div>개인</div>}</div>
        <div>{qna.user_id.authority === "1" && <div>사업자</div>}</div>
      </div>
      <div>
        <Link to={`/admin/${qna.user_id.id}/qna/${qna.id}/`}>{qna.title}</Link>
      </div>
      <div>{qna.registered_date}</div>
      <div>
        <div>{qna.answer && <div> ✔ </div>}</div>
        <div>{!qna.answer && <div> ✖ </div>}</div>
      </div>
    </div>
  );
}

export default AdminQnaSummary;
