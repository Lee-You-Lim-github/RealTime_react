function QnaDetailSummary({ qna }) {
  return (
    <div>
      {qna && (
        <div>
          <span>제목</span>
          <div>{qna.qna_title}</div>
          <div>
            {qna.qna_content.split(/[\r\n]+/).map((line, index) => (
              <p className="my-3" key={index}>
                {line}
              </p>
            ))}
          </div>
          <div>
            {qna.qna_photo && <img src={qna.qna_photo} alt="qna_photo" />}
          </div>
          <div>
            <span>답변</span>
            {qna.qna_answer && <div>{qna.qna_answer}</div>}
            {!qna.qna_answer && <div>답변을 준비 중 입니다.</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default QnaDetailSummary;
