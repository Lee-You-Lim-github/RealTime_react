import React, { useEffect, useRef, useState } from "react";
import styles from "./sidebar.module.css";
import question from "assets/img/question.png";
import remove from "assets/img/remove.png";
import "../Header/TopNav.css";

const Sidebar = ({ width = 280, children }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-217);
  const side = useRef();

  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(-217);
      setOpen(false);
    }
  };

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setX(-217);
      await setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });

  return (
    <div className={styles.container}>
      <div
        ref={side}
        className={styles.sidebar}
        style={{
          width: `${width}px`,

          transform: `translatex(${-xPosition}px)`,
        }}
      >
        <button onClick={() => toggleMenu()} className={styles.button}>
          {isOpen ? (
            <span>
              <img className="bg-auto" src={remove} />
            </span>
          ) : (
            <div
              style={{
                textAlign: "center",
                display: "inline-block",
                lineHeight: "25px",
              }}
              className="text-4xl"
            >
              <img className="w-30 h-30" src={question} />
            </div>
          )}
        </button>
        <div className="px-4">
          <h2 className="ml-5 mb-5 text-2xl">혼잡도 상태</h2>
          <ul>
            <li className="mb-5">
              <div
                style={{
                  backgroundColor: "blue",
                  width: 50,
                  height: 50,
                  display: "inline-block",
                  margin: 5,
                  borderRadius: 50,
                  textAlign: "center",
                  userSelect: "none",
                  lineHeight: "50px",
                }}
              >
                <span className="text-white font-bold">여유</span>
              </div>
              <span
                style={{
                  margin: 10,
                }}
              >
                0~33%
              </span>
            </li>
            <li className="mb-5">
              <div
                style={{
                  backgroundColor: "green",
                  width: 50,
                  height: 50,
                  display: "inline-block",
                  margin: 5,
                  borderRadius: 50,
                  textAlign: "center",
                  userSelect: "none",
                  lineHeight: "50px",
                }}
              >
                <span className="text-white font-bold">보통</span>
              </div>
              <span
                style={{
                  margin: 10,
                }}
              >
                33~66%
              </span>
            </li>
            <li className="mb-5">
              <div
                style={{
                  backgroundColor: "orange",
                  width: 50,
                  height: 50,
                  display: "inline-block",
                  margin: 5,
                  borderRadius: 50,
                  textAlign: "center",
                  userSelect: "none",
                  lineHeight: "50px",
                }}
              >
                <span className="text-white font-bold">혼잡</span>
              </div>
              <span
                style={{
                  margin: 10,
                }}
              >
                66~99%
              </span>
            </li>
            <li className="mb-5">
              <div
                style={{
                  backgroundColor: "red",
                  width: 50,
                  height: 50,
                  display: "inline-block",
                  margin: 5,
                  borderRadius: 50,
                  textAlign: "center",
                  userSelect: "none",
                  lineHeight: "50px",
                }}
              >
                <span className="text-white font-bold">만석</span>
              </div>
              <span
                style={{
                  margin: 10,
                }}
              >
                100%
              </span>
            </li>
            <li className="mb-5">
              <div
                style={{
                  backgroundColor: "gray",
                  width: 50,
                  height: 50,
                  display: "inline-block",
                  margin: 5,
                  borderRadius: 50,
                  textAlign: "center",
                  userSelect: "none",
                  lineHeight: "50px",
                }}
              >
                <span className="text-white font-bold">휴일</span>
              </div>
              <span
                style={{
                  display: "inline-block",
                  margin: 10,
                }}
              >
                휴일
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
