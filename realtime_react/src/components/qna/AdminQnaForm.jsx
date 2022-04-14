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
    <div className="mt-10">
      {qna && (
        <div>
          <hr className="border-t border-orange-400" />
          <div className="grid grid-cols-6 border-orange-400 border border-t-0">
            <label className="bg-orange-400 text-white w-10 h-8 rounded rounded-lg mt-3 ml-5 pt-1 flex justify-center">
              제목
            </label>

            <div className="col-span-3">
              <p className=" col-start-3 my-3 ml-4 w-10/12">{qna.title}</p>
            </div>
            <label className="text-stone-400 mt-3 flex justify-end">
              작성자
            </label>

            <div>
              <p className="col-start-4 my-3 ml-4  w-10/12">
                {qna.user_id.user_id}
              </p>
            </div>
          </div>
          <div className="border border-t-0 border-orange-400">
            <div className="col-span-6 pl-8 pt-6">
              {qna.content.split(/[\r\n]+/).map((line, index) => (
                <p className="my-3" key={index}>
                  {line}
                </p>
              ))}

              <div className="max-w-xs max-h-full pl-10 relative left-[180px]">
                {qna.photo && <img src={qna.photo} alt="photo" />}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-stone-400 mt-5 h-72">
        <div className="p-5 pb-5 text-center">
          <p className="pt-1 rounded-lg bg-orange-400 w-10 h-8 text-white">
            답변
          </p>
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
                placeholder="답변을 입력해주세요."
                className="outline-none bg-white border-2 border-orange-400 w-[680px] h-48"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="my-3 flex justify-end">
        <button
          onClick={handleSubmit}
          className="mr-3 w-16 h-8 bg-orange-400 text-white rounded-lg"
        >
          저장
        </button>
        <button
          onClick={() => navigate(`/admin/${userId}/qna/${qnaId}/`)}
          className="w-16 h-8 text-stone-400 border border-stone-400 rounded-lg"
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default AdminQnaForm;
