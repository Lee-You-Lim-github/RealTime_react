import NotVisitConfirmModal from "components/modal/NotVisitConfirmModal";
import VisitConfirmModal from "components/modal/VisitConfirmModal";
import { useAuth } from "contexts/AuthContext";
import React, { useState } from "react";

function ShopBookingComponent({
  book_obj,
  index,
  saveBookingVisitState,
  refetch,
  setTableCount,
}) {
  const [auth] = useAuth();
  // visit_confirm 모달창
  const [modalOpen, setModalOpen] = useState(false);

  // not_visit_confirm 모달창
  const [modalOpenNotVisit, setModalOpenNotVisit] = useState(false);

  // disable
  const [loading, setLoading] = useState(false);

  // 회원이 방문한 경우
  const clickedVisit = () => {
    setTableCount((prev) => prev - book_obj.book_table_count);

    saveBookingVisitState({
      url: `/booking/api/bookings/${book_obj.id}/`,
      data: { visit_status: "1" },
    })
      .then((response) => {
        alert("방문이 확인되었습니다.");
        refetch();
        setLoading(true);
      })
      .catch();
  };

  // 회원이 미방문한 경우
  const clickedUnvisited = () => {
    setTableCount((prev) => prev - book_obj.book_table_count);

    saveBookingVisitState({
      url: `/booking/api/bookings/${book_obj.id}/`,
      data: {
        black_set: [{ user_id: auth.id, book_id: book_obj.id }],
        visit_status: "2",
      },
    })
      .then((response) => {
        alert("패널티가 부여되었습니다.");
        refetch();
        setLoading(true);
      })
      .catch();
  };

  return (
    <React.Fragment>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{index}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {book_obj.user_id.username}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {book_obj.user_id.telephone}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{book_obj.day}</p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {book_obj.time.slice(0, 5)}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {book_obj.book_table_count}
          </p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          {book_obj.visit_status === "0" ? (
            <>
              <React.Fragment>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setModalOpen(true)}
                  className="mr-3 text-sm bg-orange-400 border-2 border-orange-400 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  방문
                </button>
                <VisitConfirmModal
                  clickedVisit={(e) => clickedVisit(book_obj.id)}
                  open={modalOpen}
                  close={() => setModalOpen(false)}
                  name="visit"
                  header="방문하셨습니까?"
                />
              </React.Fragment>
              <React.Fragment>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setModalOpenNotVisit(true)}
                  className="text-sm bg-wihte border-2 border-orange-400 text-orange-400 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  미방문
                </button>
                <NotVisitConfirmModal
                  clickedUnvisited={(e) => clickedUnvisited(book_obj.id)}
                  open={modalOpenNotVisit}
                  close={() => setModalOpenNotVisit(false)}
                  name="not_visit"
                  header="미방문으로 인해 사용자에게 패널티가 부여됩니다."
                />
              </React.Fragment>
            </>
          ) : (
            <div>{book_obj.visit_status === "1" ? "방문" : "미방문"}</div>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
}

export default ShopBookingComponent;
