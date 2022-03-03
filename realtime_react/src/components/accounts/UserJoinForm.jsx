import { useApiAxios } from "api/base";
import useFieldValues from "hook/usefieldValues";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "components/LoadingIndicator";
import React, { useState } from "react";
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

      alert("가입이 완료되었습니다.");
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
    <div className="bg-scroll bg-[url('assets/img/koreafood.png')] bg-cover">
      <div className="flex justify-center items-center">
        <div class="lg:w-2/5 md:w-1/2 w-2/3">
          <div class="bg-white border-2 border-violet-300 rounded-lg shadow-xl mx-auto p-10 my-20">
            <h1 class="text-center text-3xl mb-10">회원가입</h1>
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

            <div>
              <label class="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                아이디
              </label>
              <input
                type="text"
                name="user_id"
                value={fieldValues.user_id}
                onChange={handleFieldChange}
                placeholder="영문/숫자 혼합 3자 이상 입력해주세요."
                className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              />
              {errorMessages?.user_id?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div>
              <label class="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                비밀번호
              </label>
              <input
                type="password"
                name="password"
                value={fieldValues.password}
                onChange={handleFieldChange}
                placeholder="영문/숫자/특수문자 혼합 8자 이상 입력해주세요."
                className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              />
              {errorMessages.password?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div>
              <label class="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                비밀번호 확인
              </label>
              <input
                type="password"
                name="password2"
                value={fieldValues.password2}
                onChange={handleFieldChange}
                placeholder="확인을 위해 동일한 비밀번호를 입력해주세요."
                className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              />
              {errorMessages.non_field_errors?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div>
              <label class="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                이름
              </label>
              <input
                type="text"
                name="username"
                value={fieldValues.username}
                onChange={handleFieldChange}
                placeholder="이름을 입력해주세요."
                className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              />
              {errorMessages.username?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div>
              <label class="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                닉네임
              </label>
              <input
                type="text"
                name="nickname"
                value={fieldValues.nickname}
                onChange={handleFieldChange}
                placeholder="한글 5자 이하로 입력해주세요."
                className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              />
              {errorMessages.nickname?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div>
              <label class="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                휴대폰 번호
              </label>
              <input
                type="text"
                name="telephone"
                value={fieldValues.telephone}
                onChange={handleFieldChange}
                placeholder="숫자만 입력해주세요. 예)01022334567"
                className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              />
              {errorMessages.telephone?.map((message, index) => (
                <p key={index} className="text-xs text-red-400 mb-3">
                  {message}
                </p>
              ))}
            </div>
            <React.Fragment>
              <div>
                <button
                  className="text-white text-lg bg-violet-400 border-2 border-violet-400 hover:border-red-300 hover:bg-red-300 w-full rounded p-1 mb-1 mt-6"
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
                className="text-violet-400 text-lg bg-white border-2 border-violet-400 w-full hover:border-red-300 hover:text-red-300 rounded my-1 mb-5 p-1"
                onClick={() => navigate("/")}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserJoinForm;
