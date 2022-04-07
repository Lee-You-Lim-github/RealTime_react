function AdminQnaDetailSummary({ qna }) {
  return (
    <div>
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

              <div className="max-w-xs max-h-full relative left-[320px]">
                {qna.photo && <img src={qna.photo} alt="photo" />}
              </div>
            </div>
          </div>

          <div className="bg-stone-400 mt-5 h-72">
            <div className="p-5 pb-5 text-center">
              <p className="pt-1 rounded-lg bg-orange-400 w-10 h-8 text-white">
                답변
              </p>
            </div>
            <div className="bg-white border-2 border-orange-400 h-48 mr-10 ml-10">
              {qna.answer && <label>{qna.answer}</label>}
              {!qna.answer && <label>관리자님, 답변해주세요.</label>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminQnaDetailSummary;
