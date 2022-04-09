import React from "react";
import ShopCarousel from "components/map/ShopCarousel";
import "./modal.css";
import main from "assets/img/main1.png";
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
                <div className="mt-6 ml-40">지금 예약 방법</div>
              </div>
              <div className="mt-4 mr-8 ml-[70px] h-[420px] w-[310px] bg-white border-2  rounded-tr-lg rounded-tl-lg">
                <div className="flex mt-6">
                  <div className="mt-1 ml-1 text-red-500">♡</div>
                  <div className="ml-1 mt-1 text-lg font-bold">엉클 까르보</div>
                  <div className="ml-3 border-2 border-orange-300 rounded text-sm">
                    지금예약
                  </div>
                  <div className="ml-3 border-2 border-orange-300 rounded text-sm">
                    지금말고 예약
                  </div>
                </div>
                <div className="ml-6 text-xs mt-1 mb-1">
                  잔여 테이블 수 7/12
                </div>

                <img className="w-80 h-48" src={uncle} />
                <hr className="mt-2" />
                <div className="ml-2 mt-2">
                  1. 먼저 원하는 매장에서 예약할 방법을 선택하세요
                </div>
                <div className="ml-2">2. 지금 예약은 20분 안에 방문 때,</div>
                <div className="ml-2">
                  3. 지금 말고 예약은 다른 시간에 방문할 때{" "}
                </div>
              </div>
            </div>

            <div className="bg-stone-100">
              <div style={{ padding: 8 }}>
                <div className="mt-6 ml-40">지금 예약 방법</div>
              </div>
              <div className="mt-4 mr-8 ml-[70px] h-[420px] w-[310px] bg-white border-2  rounded-tr-lg rounded-tl-lg">
                <div className="border-2 rounded mt-4 ml-4 mr-4 mb-20 h-36 text-center border-gray-400">
                  <div className="mt-4">지금 예약 하시겠어요?</div>
                </div>
                <hr className="mt-28" />
                <div className="mt-2 ml-2">
                  1. 원하시는 매장의 테이블 수를 선택하세요
                </div>
                <div className=" ml-2">2. 테이블 기준 인원은 4인 입니다</div>
              </div>
              <div className="bg-white fixed bottom-72 w-[420px] left-[470px] border-2 border-gray-600 shadow-xl rounded-full border-rounded">
                <div className="flex mt-2 mb-2">
                  <div className="ml-4">예약 테이블 수</div>
                  <div className="ml-16 rounded border-2 border-red-200">-</div>
                  <div className="ml-5">1</div>
                  <div className="ml-4 mr-5 rounded border-2 border-blue-200">
                    +
                  </div>
                  <div className="ml-4 mr-10 rounded border-2 border-gray-400">
                    예약하기
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-stone-100">
              <div style={{ padding: 8 }}>
                <div className="mt-6 ml-44">예약 확인</div>
              </div>
              <div className="mt-4 mr-8 ml-[70px] h-[420px] w-[310px] bg-white border-2  rounded-tr-lg rounded-tl-lg">
                <div className="ml-4 mt-2 font-bold">엉클 까르보</div>
                <table className="mt-[5px] ml-[10px] border-collapse border border-gray-400 border-slate-400 ...">
                  <thead>
                    <tr>
                      <th className="border border-slate-300">
                        <div className="text-xs ml-2 mr-2">예약날짜</div>
                        <div className="text-xs ml-2 mr-2">예약시간</div>
                        <div className="text-xs mb-9 ml-2 mr-2">테이블 수</div>
                      </th>
                      <th className="border border-slate-300">
                        <div className="text-xs mr-40">22-00-00</div>
                        <div className="text-xs mr-40">12:00:00</div>
                        <div className="text-xs mr-40">1</div>
                        <div className="text-xs ml-40">방문예정</div>
                        <div className="border-2 rounded text-xs ml-40 mb-1">
                          예약취소
                        </div>
                      </th>
                    </tr>
                  </thead>
                </table>
                <hr className="mt-36" />
                <div className="mt-2 ml-2">
                  1. 마이 페이지 예약 내역에서 예약 내역을 확인, 취소할 수
                  있습니다
                </div>
                <div className="ml-2">
                  2. 단, 지금 예약은 5분 이내만 가능합니다
                </div>
              </div>
            </div>

            <div className="bg-stone-100">
              <div style={{ padding: 8 }}>
                <div className="mt-6 ml-40">줄서기 방법</div>
              </div>
              <div className="mt-4 mr-8 ml-[70px] h-[420px] w-[310px] bg-white border-2  rounded-tr-lg rounded-tl-lg">
                <div className="flex mt-6">
                  <div className="mt-1 ml-1 text-red-500">♡</div>
                  <div className="ml-1 mt-1 text-lg font-bold">엉클 까르보</div>
                  <div className="ml-3 border-2 border-orange-300 rounded text-sm">
                    줄서기
                  </div>
                  <div className="ml-3 border-2 border-orange-300 rounded text-sm">
                    지금말고 예약
                  </div>
                </div>
                <div className="ml-6 text-xs mt-1 mb-1">
                  잔여 테이블 수 7/12
                </div>

                <img className="w-96 h-48" src={uncle} />
                <hr className="mt-2" />
                <div className="mt-2 ml-2">
                  1. 만석인 매장에서 줄서기를 할 수 있습니다
                </div>
              </div>
            </div>

            <div className="bg-stone-100">
              <div style={{ padding: 8 }}>
                <div className="mt-6 ml-40">대기 순번 확인</div>
              </div>

              <div className="mt-4 mr-8 ml-[70px] h-[420px] w-[310px] bg-white border-2  rounded-tr-lg rounded-tl-lg">
                <img className="w-96 h-48" src={main} />
                <hr className="mt-20" />
                <div className="mt-2 ml-2">
                  1. 대기 순서는 홈 화면 하단에서 확인할 수 있습니다
                </div>

                <div className="fixed left-[2119px] top-[213px] border border-4 rounded-full w-14 h-14 border-red-500"></div>
              </div>
            </div>
          </ShopCarousel>
        </section>
      ) : null}
    </div>
  );
}

export default DirectionModal;
