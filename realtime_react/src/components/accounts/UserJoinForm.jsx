import { useApiAxios } from "api/base";
import useFieldValues from "hook/usefieldValues";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "components/LoadingIndicator";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmModal from "components/modal/ConfirmModal";

const INIT_FIELD_VALUES = {
  user_id: "",
  password: "",
  password2: "",
  username: "",
  nickname: "",
  telephone: "",
  authority: "0",
};

function UserJoinForm({ handleDidSave }) {
  const navigate = useNavigate();

  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);

  // confirm 모달창
  const [modalOpen, setModalOpen] = useState(false);

  const [{ loading, error, errorMessages }, requestMember] = useApiAxios(
    {
      url: "/accounts/api/signup/",
      method: "POST",
    },
    { manual: true }
  );

  const handleSubmit = () => {
    requestMember({ data: fieldValues }).then((response) => {
      console.log("가입완료");

      const {
        user_id,
        password,
        password2,
        username,
        nickname,
        telephone,
        authority,
      } = response.data;

      toast.info("🦄 가입이 완료되었습니다.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      if (handleDidSave) handleDidSave();
    });
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
    <div className="mt-2">
      <h2 className="text-2xl my-5">회원가입</h2>
      {loading && <LoadingIndicator>가입 중...</LoadingIndicator>}
      {error?.response?.status >= 400 && (
        <div className="text-red-400 my-5">가입에 실패했습니다.</div>
      )}

      <div>
        <input
          type="radio"
          name="authority"
          value="0"
          onChange={handleFieldChange}
          className="mx-1"
        />
        <span className="mr-28">개인</span>
        <input
          type="radio"
          name="authority"
          value="1"
          onChange={handleFieldChange}
          className="mx-1"
        />
        사업자
      </div>
      <p className="text-left ml-56">아이디</p>
      <input
        type="text"
        name="user_id"
        value={fieldValues.user_id}
        onChange={handleFieldChange}
        placeholder="영문/숫자 혼합 3자 이상 입력해주세요."
        className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
      />
      {errorMessages.user_id?.map((message, index) => (
        <p key={index} className="text-xs text-red-400">
          {message}
        </p>
      ))}

      <p className="text-left ml-56">비밀번호</p>
      <input
        type="password"
        name="password"
        value={fieldValues.password}
        onChange={handleFieldChange}
        placeholder="영문/숫자/특수문자 혼합 8자 이상 입력해주세요."
        className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
      />
      {errorMessages.password?.map((message, index) => (
        <p key={index} className="text-xs text-red-400">
          {message}
        </p>
      ))}

      <p className="text-left ml-56">비밀번호 확인</p>
      <input
        type="password"
        name="password2"
        value={fieldValues.password2}
        onChange={handleFieldChange}
        placeholder="확인을 위해 동일한 비밀번호를 입력해주세요."
        className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
      />
      {errorMessages.non_field_errors?.map((message, index) => (
        <p key={index} className="text-xs text-red-400">
          {message}
        </p>
      ))}

      <p className="text-left ml-56">이름</p>
      <input
        type="text"
        name="username"
        value={fieldValues.username}
        onChange={handleFieldChange}
        placeholder="이름을 입력해주세요."
        className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
      />
      {errorMessages.username?.map((message, index) => (
        <p key={index} className="text-xs text-red-400">
          {message}
        </p>
      ))}

      <p className="text-left ml-56">닉네임</p>
      <input
        type="text"
        name="nickname"
        value={fieldValues.nickname}
        onChange={handleFieldChange}
        placeholder="한글 5자 이하로 입력해주세요."
        className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
      />
      {errorMessages.nickname?.map((message, index) => (
        <p key={index} className="text-xs text-red-400">
          {message}
        </p>
      ))}

      <p className="text-left ml-56">휴대폰 번호</p>
      <input
        type="text"
        name="telephone"
        value={fieldValues.telephone}
        onChange={handleFieldChange}
        placeholder="숫자만 입력해주세요. 예)01022334567"
        className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
      />
      {errorMessages.telephone?.map((message, index) => (
        <p key={index} className="text-xs text-red-400">
          {message}
        </p>
      ))}
      <React.Fragment>
        <div>
          <button
            className="bg-violet-300 w-1/2 rounded my-1 mx-2 p-2"
            onClick={openModal}
          >
            가입
          </button>
        </div>
        <ConfirmModal
          handleSubmit={handleSubmit}
          open={modalOpen}
          close={closeModal}
          header="가입하시겠습니까?"
        ></ConfirmModal>
      </React.Fragment>
      <div>
        <button
          className="bg-slate-300 w-1/2 rounded my-1 mx-2 mb-5 p-2"
          onClick={() => navigate("/")}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default UserJoinForm;
