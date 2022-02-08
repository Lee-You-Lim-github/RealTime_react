function UserJoinForm() {
  return (
    <div className="mt-2">
      <h2 className="text-2xl my-5">회원가입</h2>
      <div>
        <p className="text-left ml-56">아이디</p>
        <input
          placeholder="3자 이상 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
      </div>
      <p className="text-left ml-56">비밀번호</p>
      <div>
        <input
          placeholder="영문/숫자 혼합 8자 이상 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
      </div>
      <p className="text-left ml-56">비밀번호 확인</p>
      <div>
        <input
          placeholder="영문/숫자 혼합 8자 이상 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
      </div>
      <p className="text-left ml-56">이름</p>
      <div>
        <input
          placeholder="이름을 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
      </div>
      <p className="text-left ml-56">닉네임</p>
      <div>
        <input
          placeholder="사용할 닉네임을 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
      </div>
      <p className="text-left ml-56">휴대폰 번호</p>
      <div>
        <input
          placeholder="숫자만 입력해주세요. 예)01022334567"
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
      </div>
      <div>
        <button className="bg-violet-300 w-1/2 rounded my-1 mx-2 p-2">
          가입
        </button>
      </div>
      <div>
        <button className="bg-slate-300 w-1/2 rounded my-1 mx-2 mb-5 p-2">
          취소
        </button>
      </div>
    </div>
  );
}

export default UserJoinForm;
