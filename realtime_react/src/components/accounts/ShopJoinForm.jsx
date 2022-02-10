function ShopJoinForm() {
  return (
    <div className="mt-2">
      <h2 className="text-2xl my-5"> 가맹점 가입</h2>

      <p className="text-left ml-56">사업자등록번호</p>
      <input
        type="text"
        placeholder="10자리 숫자로만 입력해주세요."
        className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
      />

      <p className="text-left ml-56 mt-2">매장명</p>
      <input
        type="text"
        placeholder="매장명을 입력해주세요."
        className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
      />

      <p className="text-left ml-56 mt-2">업종</p>
      <select className="border border-gray-300 rounded w-1/2 my-1 mx-2 p-2">
        <option>한식</option>
        <option>일식</option>
        <option>양식</option>
        <option>중식</option>
        <option>분식</option>
      </select>

      <p className="text-left ml-56 mt-2">매장 주소</p>
      <input
        type="text"
        placeholder="주소를 입력해주세요."
        className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
      />

      <p className="text-left ml-56 mt-2">매장 전화번호</p>
      <input
        type="text"
        placeholder="숫자만 입력해주세요. 예)01022334567"
        className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
      />

      <p className="text-left ml-56 mt-2">영업 시간</p>
      <textarea
        type="text"
        placeholder="내용을 입력해주세요."
        className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
      />

      <p className="text-left ml-56 mt-2">전체 테이블 수</p>
      <input
        type="number"
        placeholder="10"
        className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
      />

      <p className="text-left ml-56 mt-2">현재 테이블 수</p>
      <input
        type="number"
        placeholder="0"
        className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
      />

      <p className="text-left ml-56 mt-2">매장의 편의시설</p>
      <input type="checkbox" className="mr-1" />
      <label className="mr-4">주차장 유무</label>
      <input type="checkbox" className="mr-1" />
      <label className="mr-4">반려동물동반 가능</label>
      <input type="checkbox" className="mr-1" />
      <label className="mr-4">와이파이 유무</label>
      <input type="checkbox" className="mr-1" />
      <label>포장 가능</label>

      <p className="text-left ml-56 mt-2">공지 사항</p>
      <textarea
        type="text"
        placeholder="내용을 입력해주세요."
        className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
      />

      <p className="text-left ml-56 mt-2">매장 소개</p>
      <textarea
        type="text"
        placeholder="내용을 입력해주세요."
        className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
      />

      <p className="text-left ml-56 mt-2">매장 사진</p>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        className="w-1/2 my-1 mx-2 p-2"
      />

      <div>
        <button className="bg-violet-300 w-1/2 rounded my-1 mx-2 p-2">
          등록
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
