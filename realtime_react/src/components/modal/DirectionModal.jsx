import React from "react";
import ShopCarousel from "components/map/ShopCarousel";
import "./modal.css";
import category_cafe from "assets/img/cafe.png";

function WaitingVisitConfirm(props) {
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
            <div>
              <div style={{ padding: 8 }}>
                <div className="ml-32">원격 줄서기 사용 안내</div>
              </div>
              <img src={category_cafe} alt="" />
            </div>
            <div>
              <div style={{ padding: 8 }}>
                <div className="ml-32">원격 줄서기 사용안내1</div>
              </div>
              <img src={category_cafe} alt="" />
            </div>
            <div>
              <div style={{ padding: 8 }}>
                <div className="ml-32">예약 사용 안내</div>
              </div>
              <img src={category_cafe} alt="" />
            </div>
            <div>
              <div style={{ padding: 8 }}>
                <div className="ml-32">예약 사용안내 1</div>
              </div>
              <img src={category_cafe} alt="" />
            </div>
          </ShopCarousel>
        </section>
      ) : null}
    </div>
  );
}

export default WaitingVisitConfirm;
