function AdminQnaDetailSummary({ qna }) {
  return (
    <div>
      {qna && (
        <div>
          <span>제목</span>
          <div>{qna.title}</div>
          <div>{qna.user_id.user_id}</div>
          <div>
            {qna.content.split(/[\r\n]+/).map((line, index) => (
              <p className="my-3" key={index}>
                {line}
              </p>
            ))}
          </div>
          <div>{qna.photo && <img src={qna.photo} alt="photo" />}</div>
          <div>
            <span>답변</span>
            {qna.answer && <div>{qna.answer}</div>}
            {!qna.answer && <div>답변을 준비 중 입니다.</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminQnaDetailSummary;
