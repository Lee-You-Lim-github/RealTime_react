import { useApiAxios } from "api/base";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminQnaDetailSummary from "./AdminQnaDetailSummary";
import QnaDetailSummary from "./QnaDetailSummary";

function AdminQnaDetail({ userId, qnaId }) {
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

  const handleDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteQna().then();
      navigate("/admin/qna/");
    }
  };
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <div className="mt-24">
        <AdminQnaDetailSummary qna={qna} />
      </div>

      <div className=" flex justify-end my-3 text-sm align-middle">
        <button
          className="w-24 h-8 ml-2 border border-orange-400 rounded-sm text-orange-400"
          disabled={deleteLoading}
          onClick={handleDelete}
        >
          삭제
        </button>
        <>
          <button
            className="w-24 h-8 ml-2 bg-orange-400 rounded-sm text-white "
            onClick={() => navigate(`/admin/${userId}/qna/${qnaId}/answer/`)}
          >
            답변
          </button>
        </>

        <div className=" ml-2 pr-1  align-middle flex justify-end">
          <Link
            className="w-24 h-8 border border-stone-400 rounded-sm text-stone-400  "
            type="button"
            to="/admin/qna/"
          >
            <div className="text-center mt-1.5 text-sm">목록</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminQnaDetail;
