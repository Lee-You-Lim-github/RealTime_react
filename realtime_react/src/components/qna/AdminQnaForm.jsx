import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DATA_FIELDS = ["answer"];

function AdminQnaForm({ userId, qnaId }) {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [answer, setAnswer] = useState();

  const [{ data: qna, loading, error }, refetch] = useApiAxios(
    { url: `/qna/api/qna/${qnaId}/`, method: "GET" },
    { manual: true }
  );

  const [{ errorMessages }, saveAdminanswer] = useApiAxios(
    {
      url: `/qna/api/qna/${qnaId}/`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  const handleSubmit = () => {
    saveAdminanswer({
      data: { answer: answer },
    })
      .then(() => {
        navigate(`/admin/${userId}/qna/${qnaId}/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {qna && (
        <div>
          <div>{qna.title}</div>
          <div>{qna.user_id.user_id}</div>
          <div>{qna.content}</div>
          <img src={qna.photo} alt={qnaId} />
        </div>
      )}
      <div>
        <p>답변</p>
      </div>
      <div>
        {DATA_FIELDS.map((dataType, index) => (
          <div key={index}>
            <textarea
              type="textarea"
              name={dataType}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              placeholder={dataType}
            />
          </div>
        ))}
      </div>

      <button onClick={handleSubmit}>저장</button>
      <button onClick={() => navigate(`/admin/${userId}/qna/${qnaId}/`)}>
        취소
      </button>
    </div>
  );
}

export default AdminQnaForm;
