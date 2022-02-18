import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useEffect, useState } from "react";
import produce from "immer";
import { useNavigate } from "react-router-dom";
// import NumericInput from "react-numeric-input";

const INIT_FIELD_VALUES = {
  shop_num: "",
  name: "",
  category: "한식",
  address: "",
  lat: 0,
  long: 0,
  telephone: "",
  opening_hours: "",
  total_table_count: 0,
  conv_parking: false,
  conv_pet: false,
  conv_wifi: false,
  conv_pack: false,
  notice: "",
  intro: "",
  photo: "",
};

function ShopForm({ shopId, handleDidSave }) {
  const [auth] = useAuth();

  // 사진 파일 업로드 시 사진이 보이게
  const [imageSrc, setImageSrc] = useState("");

  // 사진 파일 업로드 시 사진이 보이게
  const preview_photo = (e, fileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
        handleFieldChange(e);
      };
    });
  };

  // shop/api/100 조회
  const [{ data: getShopData, loading: getShopLoading, error: getShopError }] =
    useApiAxios(
      {
        url: `/shop/api/shops/${shopId}/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: !shopId }
    );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    getShopData || INIT_FIELD_VALUES
  );

  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.photo = "";
      })
    );
  }, [getShopData]);

  // 생성 및 수정 저장
  const [
    {
      loading: shopFormLoading,
      error: shopFormError,
      errorMessages: ShopSavedErrorMessages,
    },
    saveShopRequest,
  ] = useApiAxios(
    {
      url: !shopId ? "/shop/api/newshop/" : `/shop/api/newshop/${shopId}/`,
      method: !shopId ? "POST" : "PUT",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  // 값 저장
  const shopHandleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        const fileList = value;
        fileList.forEach((file) => formData.append(name, file));
      } else {
        formData.append(name, value);
      }
    });
    formData.append("user_id", auth.id);

    console.log(formData);

    if (!shopId) {
      if (window.confirm("등록하시겠습니까?")) {
        saveShopRequest({
          data: formData,
        }).then((response) => {
          alert("등록되었습니다.");
          const saveShop = response.data;
          if (handleDidSave) handleDidSave(saveShop);
        });
      }
    } else {
      saveShopRequest({
        data: formData,
      }).then((response) => {
        alert("수정되었습니다.");
        const saveShop = response.data;
        if (handleDidSave) handleDidSave(saveShop);
      });
    }
  };

  return (
    <div className="mt-2">
      {!shopId ? (
        <h2 className="text-2xl my-5"> 가맹점 가입</h2>
      ) : (
        <h2 className="text-2xl my-5"> 매장 정보 수정</h2>
      )}
      <form onSubmit={shopHandleSubmit}>
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
          step="0.00001"
          min="0"
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
          step="0.00001"
          min="0"
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
        {ShopSavedErrorMessages.long?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}
        {/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */}

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

        <p className="text-left ml-56 mt-2">편의시설</p>
        <input
          type="checkbox"
          name="conv_parking"
          checked={fieldValues.conv_parking ? true : false}
          onChange={handleFieldChange}
          className="mr-1 accent-pink-500"
        />
        <label className="mr-4">주차장 유무</label>

        <input
          type="checkbox"
          name="conv_pet"
          checked={fieldValues.conv_pet ? true : false}
          onChange={handleFieldChange}
          className="mr-1 accent-pink-500"
        />
        <label className="mr-4">반려동물동반 가능</label>
        <input
          type="checkbox"
          name="conv_wifi"
          checked={fieldValues.conv_wifi ? true : false}
          onChange={handleFieldChange}
          className="mr-1 accent-pink-500"
        />
        <label className="mr-4">와이파이 유무</label>
        <input
          type="checkbox"
          name="conv_pack"
          checked={fieldValues.conv_pack ? true : false}
          onChange={handleFieldChange}
          className="mr-1 accent-pink-500"
        />
        <label>포장 가능</label>

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
          onChange={(e) => {
            preview_photo(e, e.target.files[0]);
          }}
          accept=".png, .jpg, .jpeg"
          className="w-1/2 my-1 mx-2 p-2"
        />
        <div className="ml-56 mt-2">
          <img src={imageSrc || getShopData?.photo} alt="사진 미리보기" />
        </div>

        <div>
          {!shopId ? (
            <button className="bg-violet-300 w-1/2 rounded my-1 mx-2 p-2">
              등록
            </button>
          ) : (
            <button className="bg-violet-300 w-1/2 rounded my-1 mx-2 p-2">
              수정
            </button>
          )}
        </div>
      </form>
      <div>
        {!shopId ? (
          <button className="bg-slate-300 w-1/2 rounded my-1 mx-2 mb-5 p-2">
            취소
          </button>
        ) : (
          <button className="bg-slate-300 w-1/2 rounded my-1 mx-2 mb-5 p-2">
            취소
          </button>
        )}
      </div>
    </div>
  );
}

export default ShopForm;
