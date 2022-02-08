function ShopJoinForm() {
  return (
    <div className="mt-2">
      <h2 className="text-2xl my-5"> 가맹점 가입</h2>
      <div>
        <p className="text-left ml-56">사업자등록번호</p>
        <input
          placeholder="10자리 숫자로만 입력해주세요."
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
      <p className="text-left ml-56">매장명</p>
      <div>
        <input
          placeholder="매장명을 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
      </div>
      <p className="text-left ml-56">업종</p>
      <div>
        <input
          placeholder="업종을 선택하세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
      </div>
      <p className="text-left ml-56">매장 주소</p>
      <div>
        <input
          placeholder="주소를 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
      </div>
      <p className="text-left ml-56">매장 전화번호</p>
      <div>
        <input
          placeholder="숫자만 입력해주세요. 예)01022334567"
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
      </div>
      <p className="text-left ml-56">영업 시간</p>
      <div>
        <input
          placeholder="내용을 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
      </div>
      <p className="text-left ml-56">테이블 수</p>
      <div>
        <input
          placeholder="내용을 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
      </div>
      <p className="text-left ml-56">매장의 편의시설</p>
      <div>
        <input
          placeholder="내용을 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
      </div>
      <p className="text-left ml-56">공지 사항</p>
      <div>
        <input
          placeholder="내용을 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
      </div>
      <p className="text-left ml-56">매장 소개</p>
      <div>
        <input
          placeholder="내용을 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
      </div>
      <p className="text-left ml-56">매장 사진</p>
      <div>
        <input
          placeholder="내용을 입력해주세요."
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

export default ShopJoinForm;
