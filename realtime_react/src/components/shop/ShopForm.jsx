import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useEffect, useState } from "react";

const INIT_FIELD_VALUES = {
  shop_num: "",
  name: "",
  category: "",
  address: "",
  lat: 0,
  long: 0,
  telephone: "",
  opening_hours: "",
  total_table_count: 0,
  now_table_count: 0,
  shop_convs: [
    {
      parking: false,
      pet: false,
      wifi: false,
      pack: false,
    },
  ],
  notice: "",
  intro: "",
  photo: "",
  conv: "",
};

function ShopForm({ shopId, handleDidSave }) {
  const [auth] = useAuth();

  // const [
  //   {
  //     data: shopData,
  //     loading: shopLaoding,
  //     error: shopError,
  //     errorMessages: shopErrorMessages,
  //   },
  // ] = useApiAxios(
  //   {
  //     url: `/shop/api/shops/${shopId}/`,
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${auth.access}`,
  //     },
  //   },
  //   { manual: !shopId }
  // );

  // 생성 및 수정 저장
  const [
    {
      laoding: shopFormLoading,
      error: shopFormError,
      errorMessages: ShopSavedErrorMessages,
    },
    saveShopRequest,
  ] = useApiAxios(
    {
      url: "/shop/api/shops/",
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  const { fieldValues, handleFieldChange, setFieldValues } =
    useFieldValues(INIT_FIELD_VALUES);

  // useEffect(() => {
  //   setFieldValues(
  //     produce((draft) => {
  //       draft.photo = "";
  //     })
  //   );
  // }, []);

  const shopHandleSubmit = (e) => {
    e.preventDefault();
    console.log("저장 성공!!");

    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        const fileList = value;
        fileList.forEach((file) => formData.append(name, file));
      } else {
        formData.append(name, value);
      }
      formData.append("user_id", auth.id);
    });

    saveShopRequest({
      data: formData,
    }).then((response) => {
      const saveShop = response.data;
      if (handleDidSave) handleDidSave(saveShop);
    });
  };

  // 체크박스 값 확인
  const handleCheckd = (e) => {
    console.log(e.target.checked);
  };

  // FK 값 확인
  const [value, setValue] = useState({
    test: [
      {
        test1: "",
        test2: "",
      },
    ],
  });

  const hanleTest = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
  };

  return (
    <div className="mt-2">
      <DebugStates
        // shopData={shopData}
        value={value}
        ShopSavedErrorMessages={ShopSavedErrorMessages}
        fieldValues={fieldValues}
        shopFormLoading={shopFormLoading}
        shopFormError={shopFormError}
      />
      <form onSubmit={shopHandleSubmit}>
        <h2 className="text-2xl my-5"> 가맹점 가입</h2>
        {/* {value.test.JSON.stringify()} */}

        <p className="text-left ml-56">TEST</p>
        <input
          type="text"
          name="test"
          value={value}
          onChange={(e) => hanleTest(e)}
          placeholder="10자리 숫자로만 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />

        <p className="text-left ml-56">사업자등록번호</p>
        <input
          type="text"
          name="shop_num"
          value={fieldValues.shop_num}
          onChange={handleFieldChange}
          placeholder="10자리 숫자로만 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
        {ShopSavedErrorMessages.shop_num?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}

        <p className="text-left ml-56 mt-2">매장명</p>
        <input
          type="text"
          name="name"
          value={fieldValues.name}
          onChange={handleFieldChange}
          placeholder="매장명을 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
        {ShopSavedErrorMessages.name?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}

        <p className="text-left ml-56 mt-2">업종</p>
        <select
          name="category"
          value={fieldValues.category}
          onChange={handleFieldChange}
          className="border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        >
          <option>한식</option>
          <option>일식</option>
          <option>양식</option>
          <option>중식</option>
          <option>분식</option>
        </select>
        {ShopSavedErrorMessages.category?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}

        <p className="text-left ml-56 mt-2">매장 주소</p>
        <input
          type="text"
          name="address"
          value={fieldValues.address}
          onChange={handleFieldChange}
          placeholder="주소를 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
        {ShopSavedErrorMessages.address?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}

        <p className="text-left ml-56 mt-2">위도</p>
        <input
          type="number"
          name="lat"
          value={fieldValues.lat}
          onChange={handleFieldChange}
          placeholder="위도를 입력해주세요. 예) 127.00000"
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
        {ShopSavedErrorMessages.lat?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}

        <p className="text-left ml-56 mt-2">경도</p>
        <input
          type="number"
          name="long"
          value={fieldValues.long}
          onChange={handleFieldChange}
          placeholder="경도를 입력해주세요. 예) 36.00000"
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
        {ShopSavedErrorMessages.long?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}

        <p className="text-left ml-56 mt-2">매장 전화번호</p>
        <input
          type="text"
          name="telephone"
          value={fieldValues.telephone}
          onChange={handleFieldChange}
          placeholder="숫자만 입력해주세요. 예)01022334567"
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
        {ShopSavedErrorMessages.telephone?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}

        <p className="text-left ml-56 mt-2">영업 시간</p>
        <textarea
          type="text"
          name="opening_hours"
          value={fieldValues.opening_hours}
          onChange={handleFieldChange}
          placeholder="내용을 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />

        <p className="text-left ml-56 mt-2">전체 테이블 수</p>
        <input
          type="number"
          name="total_table_count"
          value={fieldValues.total_table_count}
          onChange={handleFieldChange}
          placeholder="10"
          min={0}
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />

        <p className="text-left ml-56 mt-2">현재 테이블 수</p>
        <input
          type="number"
          name="now_table_count"
          value={fieldValues.now_table_count}
          onChange={handleFieldChange}
          placeholder="0"
          min={0}
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />

        <p className="text-left ml-56 mt-2">편의시설</p>
        <input
          type="checkbox"
          name="parking"
          checked={fieldValues.shop_convs.parking}
          onChange={(e) => handleCheckd(e)}
          className="mr-1"
        />
        <label className="mr-4">주차장 유무</label>
        {/* <input type="checkbox" className="mr-1" />
        <label className="mr-4">반려동물동반 가능</label>
        <input type="checkbox" className="mr-1" />
        <label className="mr-4">와이파이 유무</label>
        <input type="checkbox" className="mr-1" />
        <label>포장 가능</label> */}

        <p className="text-left ml-56 mt-2">공지 사항</p>
        <textarea
          type="text"
          name="notice"
          value={fieldValues.notice}
          onChange={handleFieldChange}
          placeholder="내용을 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />

        <p className="text-left ml-56 mt-2">매장 소개</p>
        <textarea
          type="text"
          name="intro"
          value={fieldValues.intro}
          onChange={handleFieldChange}
          placeholder="내용을 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />

        <p className="text-left ml-56 mt-2">매장 사진</p>
        <input
          type="file"
          name="photo"
          onChange={handleFieldChange}
          accept=".png, .jpg, .jpeg"
          className="w-1/2 my-1 mx-2 p-2"
        />

        <div>
          <button className="bg-violet-300 w-1/2 rounded my-1 mx-2 p-2">
            등록
          </button>
        </div>
      </form>
      <div>
        <button className="bg-slate-300 w-1/2 rounded my-1 mx-2 mb-5 p-2">
          취소
        </button>
      </div>
    </div>
  );
}

export default ShopForm;