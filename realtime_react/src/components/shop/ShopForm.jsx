import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import React, { useEffect, useState } from "react";
import produce from "immer";
import ConfirmModal from "components/modal/ConfirmModal";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "components/LoadingIndicator";
import ShopFormMap from "./ShopFormMap";
import DebugStates from "components/DebugStates";

const INIT_FIELD_VALUES = {
  shop_num: "",
  name: "",
  category: "한식",
  address: "",
  lat: 0,
  longitude: 0,
  telephone: "",
  opening_hours: "",
  total_table_count: 0,
  conv_parking: false,
  conv_pet: false,
  conv_wifi: false,
  conv_pack: false,
  notice: "",
  intro: "",
  photo1: "",
  photo2: "",
  photo3: "",
};

function ShopForm({ shopId, handleDidSave }) {
  const [auth, , , logout] = useAuth();

  // 사진 파일 업로드 시 사진이 보이게
  const [imageSrc, setImageSrc] = useState("");

  // confirm 모달창
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  // 위도, 경도 값
  // const [] = useState();

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
        draft.photo1 = "";
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
      url: !shopId ? "/shop/api/shops/" : `/shop/api/shops/${shopId}/`,
      method: !shopId ? "POST" : "PUT",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  // 값 저장
  const shopHandleSubmit = () => {
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

    if (!shopId) {
      saveShopRequest({
        data: formData,
      }).then((response) => {
        alert("등록되었습니다! 재로그인 해주세요.");
        logout();
        navigate("/accounts/login/");
      });
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

  // confirm 모달 열기
  const openModal = () => {
    setModalOpen(true);
  };

  // confirm 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg-scroll bg-[url('assets/img/koreafood.png')] bg-cover">
      <div className="flex justify-center items-center">
        <div className="lg:w-2/5 md:w-1/2 w-2/3">
          <DebugStates fieldValues={fieldValues} />
          <div className="bg-white border-2 border-violet-300 rounded-lg shadow-xl mx-auto p-10 my-20">
            {!shopId ? (
              <h2 className="text-center text-3xl mb-10">가맹점 가입</h2>
            ) : (
              <h2 className="text-center text-3xl mb-10">매장정보 수정</h2>
            )}
            <ShopFormMap
              getShopData={getShopData}
              setFieldValues={setFieldValues}
            />
            {getShopLoading && <LoadingIndicator>로딩 중...</LoadingIndicator>}
            {shopFormLoading && <LoadingIndicator>저장 중...</LoadingIndicator>}
            {getShopError?.response?.status >= 400 && (
              <div className="text-center text-red-400">
                데이터를 불러오는데 실패했습니다.
              </div>
            )}
            {!shopId
              ? shopFormError?.response?.status >= 400 && (
                  <div className="text-center text-lg text-red-400">
                    등록에 실패했습니다.
                  </div>
                )
              : shopFormError?.response?.status >= 400 && (
                  <div className="text-center text-lg text-red-400">
                    수정에 실패했습니다.
                  </div>
                )}
            <div>
              <label className="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                사업자등록번호
              </label>
              <input
                type="text"
                name="shop_num"
                value={fieldValues.shop_num}
                onChange={handleFieldChange}
                placeholder="10자리 숫자로만 입력해주세요."
                className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              />
              {ShopSavedErrorMessages.shop_num?.map((message, index) => (
                <p key={index} className="text-xs text-red-400 mt-2">
                  {message}
                </p>
              ))}
            </div>
            <div>
              <label className="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                매장명
              </label>
              <input
                type="text"
                name="name"
                value={fieldValues.name}
                onChange={handleFieldChange}
                placeholder="매장명을 입력해주세요."
                className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              />
              {ShopSavedErrorMessages.name?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div>
              <label className="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                업종
              </label>
              <select
                name="category"
                value={fieldValues.category}
                onChange={handleFieldChange}
                className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              >
                <option>한식</option>
                <option>일식</option>
                <option>양식</option>
                <option>중식</option>
                <option>카페</option>
              </select>
              {ShopSavedErrorMessages.category?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div>
              <label className="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                매장 주소
              </label>
              <input
                type="text"
                name="address"
                value={fieldValues.address}
                onChange={handleFieldChange}
                placeholder="주소를 입력해주세요."
                className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              />
              {ShopSavedErrorMessages.address?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div>
              <label className="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                매장 전화번호
              </label>
              <input
                type="text"
                name="telephone"
                value={fieldValues.telephone}
                onChange={handleFieldChange}
                placeholder="숫자만 입력해주세요. 예)01022334567"
                className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              />
              {ShopSavedErrorMessages.telephone?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div>
              <label className="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                영업 시간
              </label>
              <textarea
                type="text"
                name="opening_hours"
                value={fieldValues.opening_hours}
                onChange={handleFieldChange}
                placeholder="내용을 입력해주세요."
                className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                전체 테이블 수
              </label>
              <input
                type="number"
                name="total_table_count"
                value={fieldValues.total_table_count}
                onChange={handleFieldChange}
                placeholder="10"
                min={1}
                className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                편의시설
              </label>
              <input
                type="checkbox"
                name="conv_parking"
                checked={fieldValues.conv_parking ? true : false}
                onChange={handleFieldChange}
                className="mr-1 accent-pink-500"
              />
              <label className="mr-3">주차장 유무</label>

              <input
                type="checkbox"
                name="conv_pet"
                checked={fieldValues.conv_pet ? true : false}
                onChange={handleFieldChange}
                className="mr-1 accent-pink-500"
              />
              <label className="mr-3">반려동물동반 가능</label>
              <input
                type="checkbox"
                name="conv_wifi"
                checked={fieldValues.conv_wifi ? true : false}
                onChange={handleFieldChange}
                className="mr-1 accent-pink-500"
              />
              <label className="mr-3">와이파이 유무</label>
              <input
                type="checkbox"
                name="conv_pack"
                checked={fieldValues.conv_pack ? true : false}
                onChange={handleFieldChange}
                className="mr-1 accent-pink-500"
              />
              <label>포장 가능</label>
            </div>
            <div>
              <label className="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                공지사항
              </label>
              <textarea
                type="text"
                name="notice"
                value={fieldValues.notice}
                onChange={handleFieldChange}
                placeholder="내용을 입력해주세요."
                className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                매장소개
              </label>
              <textarea
                type="text"
                name="intro"
                value={fieldValues.intro}
                onChange={handleFieldChange}
                placeholder="내용을 입력해주세요."
                className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                매장 사진
              </label>
              <input
                type="file"
                name="photo1"
                onChange={(e) => {
                  preview_photo(e, e.target.files[0]);
                }}
                accept=".png, .jpg, .jpeg"
                className="w-full px-1 py-2 rounded-lg"
              />
              <div className="mt-2">
                <img
                  src={imageSrc || getShopData?.photo1}
                  alt=""
                  className="ml-24 w-80 h-64 mb-5"
                />
              </div>
            </div>
            <div>
              {!shopId ? (
                <React.Fragment>
                  <button
                    className="text-white text-lg bg-violet-300 border-2 border-violet-300 hover:border-red-300 hover:bg-red-300 w-full rounded p-1 mb-1"
                    onClick={openModal}
                  >
                    등록
                  </button>
                  <ConfirmModal
                    shopId={shopId}
                    shopHandleSubmit={shopHandleSubmit}
                    open={modalOpen}
                    close={closeModal}
                    header="등록하시겠습니까?"
                  ></ConfirmModal>
                </React.Fragment>
              ) : (
                <button
                  className="text-white text-lg bg-violet-300 border-2 border-violet-300 hover:border-red-300 hover:bg-red-300 w-full rounded py-1 mb-1"
                  onClick={shopHandleSubmit}
                >
                  수정
                </button>
              )}
            </div>
            <div>
              {!shopId ? (
                <button
                  className="text-violet-300 text-lg bg-white border-2 border-violet-300 w-full hover:border-red-300 hover:text-red-300 rounded my-1 mb-5 p-1"
                  onClick={() => navigate("/")}
                >
                  취소
                </button>
              ) : (
                <button
                  className="text-violet-300 text-lg bg-white border-2 border-violet-300 w-full hover:border-red-300 hover:text-red-300 rounded my-1 mb-5 p-1"
                  onClick={() => navigate(`/shop/myshop/${shopId}/`)}
                >
                  취소
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopForm;
