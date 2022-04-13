import React from "react";
import ShopCarousel from "components/map/ShopCarousel";
import "./modal.css";
import main from "assets/img/waitex.png";
import uncle from "assets/img/uncle.png";

function DirectionModal(props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, clickedVisit } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              {" "}
              &times;{" "}
            </button>
          </header>
          <ShopCarousel show={1}>
            <div className="bg-stone-100">
              <div style={{ padding: 8 }}>
                <div className="mt-4 ml-[170px]">지금 예약 방법</div>
              </div>
              <div className="mt-2 mb-10 mr-8 ml-[70px] h-[400px] w-[310px] bg-white border-2  rounded ">
                <div className="flex mt-6">
                  <div className="mt-1 ml-1 text-red-500">♡</div>
                  <div className="ml-1 mt-1 text-lg font-bold">엉클 까르보</div>
                  <div className="ml-3 border-2 border-orange-400 bg-orange-400 rounded text-white text-sm">
                    <div className="mt-1 px-1">지금예약</div>
                  </div>
                  <div className="ml-3 border-2 border-orange-400 bg-orange-400 rounded text-white text-sm">
                    <div className="mt-1 px-1">지금말고 예약</div>
                  </div>
                </div>
                <div className="ml-6 text-xs mt-1 mb-1">
                  잔여 테이블 수 7/12
                </div>

                <img className="w-80 h-48" src={uncle} />
                <hr className="mt-2" />
                <div className="ml-2 mt-5">
                  1. 먼저 원하는 매장에서 예약할 방법을 선택합니다.
                </div>
                <div className="ml-2">- 지금 예약 : 20분 내에 방문</div>
                <div className="ml-2">
                  - 지금말고 예약 : 선택한 날짜/시간에 방문{" "}
                </div>
              </div>
            </div>

            <div className="bg-stone-100">
              <div style={{ padding: 8 }}>
                <div className="mt-4 ml-[170px]">지금 예약 방법</div>
              </div>
              <div className="mt-2 mr-8 ml-[70px] h-[400px] w-[310px] bg-white border-2  rounded">
                <div className="border-2 rounded mt-4 ml-4 mr-4 h-36 text-center border-gray-400">
                  <div className="mt-4 text-gray-400">
                    지금 예약 하시겠어요?
                  </div>
                </div>
                <div className="bg-stone-100 w-[275px] mt-3 ml-4 h-24 p-2 rounded-lg">
                  <p className="text-left text-red-300 mb-1">📢 주의해주세요</p>
                  <p className="text-left text-gray-400">
                    (주)지금어때는 건강한 예약문화를 만들어가기 위하여 노쇼 시
                    횟수에 따라 패널티 ...
                  </p>
                </div>
                <hr className="mt-2" />
                <div className="mt-6 ml-2">
                  1. 원하는 매장의 테이블 수를 선택합니다.
                </div>
                <div className=" ml-2">2. 테이블 기준 인원은 4인 입니다.</div>
              </div>
              <div className="bg-white fixed bottom-72 w-[400px] left-[470px] border-2 border-gray-600 shadow-xl rounded-full border-rounded">
                <div className="flex mt-2 mb-2">
                  <div className="ml-4 mt-1">예약 테이블 수</div>
                  <div className="ml-16 rounded border-2 border-orange-400">
                    <div className="px-1">-</div>
                  </div>
                  <div className="ml-5">1</div>
                  <div className="ml-4 mr-5 rounded border-2 border-orange-400">
                    <div className="px-1">+</div>
                  </div>
                  <div className="ml-4 mr-10 rounded border-2 border-orange-400">
                    <div className="px-1">예약하기</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-stone-100">
              <div style={{ padding: 8 }}>
                <div className="mt-4 ml-[183px]">예약 확인</div>
              </div>
              <div className="mt-2 mr-8 ml-[70px] h-[400px] w-[310px] bg-white border-2  rounded">
                <div className="ml-4 mt-2 font-bold">예약 내역</div>

                <div className="mt-2 ml-16 border border-gray-400 w-44 h-60">
                  <img src={uncle} />
                  <div className="text-xs">
                    <div className="text-sm ml-14 mt-1">엉클까르보</div>
                    <div className="flex">
                      <div className=" ml-4 mt-1">예약날짜</div>
                      <div className=" ml-12 mt-1">2022-01-01</div>
                    </div>
                    <div className="flex">
                      <div className=" ml-4 mt-1">예약시간</div>
                      <div className="ml-12 mt-1">12:00:00</div>
                    </div>
                    <div className="flex">
                      <div className=" ml-4 mt-1">예약테이블 수</div>
                      <div className="ml-6 mt-1">1</div>
                    </div>
                    <div className="flex">
                      <div className="ml-4 mt-5">방문예정🚀</div>
                      <div className="border border-orange-400 rounded p-1 ml-12 mt-4">
                        예약취소
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mt-6" />
                <div className="mt-2 ml-2">
                  <p>1. 마이 페이지 예약 내역에서 예약 내역을 확인,</p>
                  <p className="ml-3">취소할 수 있습니다.</p>
                </div>
                <div className="ml-2">
                  2. 단, 지금 예약은 5분 이내만 가능합니다.
                </div>
              </div>
            </div>

            <div className="bg-stone-100">
              <div style={{ padding: 8 }}>
                <div className="mt-4 ml-[178px]">줄서기 방법</div>
              </div>
              <div className="mt-2 mr-8 ml-[70px] h-[400px] w-[310px] bg-white border-2  rounded">
                <div className="flex mt-6">
                  <div className="mt-1 ml-1 text-red-500">♡</div>
                  <div className="ml-1 mt-1 text-lg font-bold">엉클 까르보</div>
                  <div className="ml-3 border-2 border-orange-400 bg-orange-400 rounded text-white text-sm">
                    <div className="mt-1 px-1">줄서기</div>
                  </div>
                  <div className="ml-3 border-2 bg-orange-400 border-orange-400 rounded text-white text-sm">
                    <div className="mt-1 px-1">지금말고 예약</div>
                  </div>
                </div>
                <div className="ml-6 text-xs mt-1 mb-1">
                  잔여 테이블 수 12/12
                </div>

                <img className="w-96 h-48" src={uncle} />
                <hr className="mt-2" />
                <div className="mt-4 ml-2">
                  1. 만석인 매장에서 줄서기를 할 수 있습니다.
                </div>
                <div className="mt-2 ml-2">
                  <p>2. "지금 예약"과 동일한 방법으로 테이블 수를</p>
                  <p className="ml-3">선택합니다.</p>
                </div>
              </div>
            </div>

            <div className="bg-stone-100">
              <div style={{ padding: 8 }}>
                <div className="mt-4 ml-[170px]">대기 순번 확인</div>
              </div>

              <div className="mt-2 mr-8 ml-[70px] h-[400px] w-[310px] bg-white border-2  rounded">
                <img className="w-96 h-48" src={main} />
                <hr className="mt-20" />
                <div className="mt-6 ml-2">
                  <p>1. 대기 순서는 홈 화면 하단에서 확인할 수</p>
                  <p className="ml-3"> 있습니다.</p>
                </div>

                <div className="fixed left-[2118px] top-[200px] border border-4 rounded-full w-14 h-14 border-red-500"></div>
              </div>
            </div>

            <div className="bg-stone-100">
              <div style={{ padding: 8 }}>
                <div className="mt-4 ml-[183px]">대기 확인</div>
              </div>
              <div className="mt-2 mr-8 ml-[70px] h-[400px] w-[310px] bg-white border-2  rounded">
                <div className="ml-4 mt-2 font-bold">대기 내역</div>

                <div className="mt-2 ml-16 border border-gray-400 w-44 h-64">
                  <img src={uncle} />
                  <div className="text-xs">
                    <div className="ml-14 mt-1">엉클까르보</div>
                    <div className="flex">
                      <div className="ml-[48px] mt-1">대기 순서</div>
                      <div className="mt-[3px] border ml-2 rounded-full border-orange-400 bg-orange-400 h-4">
                        <div className="ml-1 mr-1">2</div>
                      </div>
                    </div>

                    <div className="flex mt-1">
                      <div className=" ml-2 ">나의 대기 번호</div>
                      <div className=" ml-10 ">2022-01-01</div>
                    </div>
                    <div className="flex">
                      <div className=" ml-2 ">대기 등록일</div>
                      <div className="ml-[53px] ">12:00:00</div>
                    </div>
                    <div className="flex">
                      <div className="ml-2 ">대기 등록 시간</div>
                      <div className="ml-10 ">1</div>
                    </div>
                    <div className="flex">
                      <div className=" ml-2 ">대기 등록 테이블 수</div>
                      <div className="ml-[17px] ">1</div>
                    </div>
                    <div className="flex">
                      <div className="ml-2 mt-3">대기중🚀</div>
                      <div className="border border-orange-400 rounded p-1 ml-16 mt-2">
                        대기취소
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mt-2" />
                <div className="mt-3 ml-2">
                  <p>1. 마이 페이지 예약 내역에서 예약 내역을 확인,</p>
                  <p className="ml-3">취소할 수 있습니다.</p>
                </div>
                <div className="ml-2">
                  2. 단, 지금 예약은 5분 이내만 가능합니다.
                </div>
              </div>
            </div>

            <div className="bg-stone-100">
              <div style={{ padding: 8 }}>
                <div className="mt-4 ml-[170px]">이용 제한 안내</div>
              </div>

              <div className="mt-2 mr-8 ml-[70px] h-[400px] w-[310px] bg-white border-2  rounded">
                <div className="mt-2 ml-16 text-red-600">
                  📢 지금어때 블랙회원 안내
                </div>
                <div className="mt-4 ml-2">
                  회사는 여러분의 쾌적한 서비스 이용을 위해 운영정책에 근거하여
                  서비스를 운영하고 있습니다.
                </div>

                <div className="mt-4 ml-2">
                  회사는 NoShow가 확인된 여러분의 계정들에 대하여 이용을 제한할
                  수 있다는 점을 유의하여 주시기 바랍니다.
                </div>

                <div className="mt-4 ml-2">
                  다만, 여러분은 이용제한과 관련하여 조치 결과가 불만족스러울
                  경우 고객센터를 통해 이의를 제기할 수 있습니다.
                </div>

                <div className="mt-1 ml-2">
                  - 1회 NoShow 시 서비스 3일 이용 제한
                </div>
                <div className="mt-1 ml-2">
                  - 2회 NoShow 시 서비스 7일 이용 제한
                </div>
                <div className="mt-1 ml-2">
                  - 3회 NoShow 시 서비스 30일 이용 제한
                </div>
                <div className="mt-1 ml-2">- 이후 서비스 영구 이용 제한</div>
              </div>
            </div>
          </ShopCarousel>
        </section>
      ) : null}
    </div>
  );
}

export default DirectionModal;
