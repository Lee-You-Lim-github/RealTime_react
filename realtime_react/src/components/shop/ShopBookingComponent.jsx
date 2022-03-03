import NotVisitConfirmModal from "components/modal/NotVisitConfirmModal";
import VisitConfirmModal from "components/modal/VisitConfirmModal";
import React, { useState } from "react";

function ShopBookingComponent({
  shop_booking,
  clickedVisit,
  clickedUnvisited,
  loading,
  index,
}) {
  // visit_confirm 모달창
  const [modalOpen, setModalOpen] = useState(false);

  // visit_confirm 모달 열기
  const openModal = () => {
    setModalOpen(true);
  };

  // visit_confirm 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  // not_visit_confirm 모달창
  const [modalOpenNotVisit, setModalOpenNotVisit] = useState(false);

  // not_visit_confirm 모달 열기
  const openModalNotVisit = () => {
    setModalOpenNotVisit(true);
  };

  // not_visit_confirm 모달 닫기
  const closeModalNotVisit = () => {
    setModalOpenNotVisit(false);
  };

  return (
    <React.Fragment>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{index}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {shop_booking.user_id.username}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {shop_booking.user_id.telephone}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{shop_booking.day}</p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {shop_booking.time.slice(0, 5)}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {shop_booking.book_table_count}
          </p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <React.Fragment>
            <button
              type="button"
              disabled={loading}
              onClick={openModal}
              onChange={shop_booking.id}
              className="mr-3 text-sm bg-violet-400 hover:bg-red-300 border-2 border-violet-400 hover:border-red-300 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              방문
            </button>
            <VisitConfirmModal
              clickedVisit={(e) => clickedVisit(shop_booking.id)}
              open={modalOpen}
              close={closeModal}
              name="visit"
              header="방문하셨습니까?"
            />
          </React.Fragment>
          <React.Fragment>
            <button
              type="button"
              disabled={loading}
              onClick={openModalNotVisit}
              onChange={shop_booking.id}
              className="text-sm bg-wihte border-2 border-violet-400 hover:border-red-300 hover:text-red-300 text-violet-400 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              미방문
            </button>
            <NotVisitConfirmModal
              clickedUnvisited={(e) => clickedUnvisited(shop_booking.id)}
              open={modalOpenNotVisit}
              close={closeModalNotVisit}
              name="not_visit"
              header="미방문으로 인해 사용자에게 패널티가 부여됩니다."
            />
          </React.Fragment>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default ShopBookingComponent;
