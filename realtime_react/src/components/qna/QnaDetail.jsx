import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QnaDetailSummary from "./QnaDetailSummary";

function QnaDetail({ qnaId, userId }) {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [{ data: qna, loading, error }, refetch] = useApiAxios(
    { url: `/qna/api/qna/${qnaId}/`, method: "GET" },
    { manual: true }
  );
  const [{ loading: deleteLoading, error: deleteError }, deleteQna] =
    useApiAxios(
      { url: `/qna/api/qna/${qnaId}/`, method: "DELETE" },
      { manual: true }
    );

  const handleDeleted = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteQna().then(() => {
        navigate(`/user/${userId}/qna/`);
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <div className="mt-10">
        <QnaDetailSummary qna={qna} />
      </div>
      <div className="flex justify-end my-3">
        <button
          className="mr-3 w-12 h-8 text-stone-400 border border-stone-400 rounded-lg"
          onClick={() => navigate(`/user/${userId}/qna/`)}
        >
          목록
        </button>

        <button
          className="w-12 h-8 text-orange-400 border border-orange-400 rounded-lg"
          onClick={handleDeleted}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default QnaDetail;
