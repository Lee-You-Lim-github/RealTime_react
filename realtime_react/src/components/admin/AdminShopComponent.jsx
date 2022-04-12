import DeleteConfirmModal from "components/modal/DeleteConfirmModal";
import React, { useState } from "react";

function AdminShopComponent({ admin_shop, handleDelete }) {
  // confirm 모달창
  const [modalOpen, setModalOpen] = useState(false);

  // confirm 모달 열기
  const openModal = () => {
    setModalOpen(true);
  };

  // confirm 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-gray-900 whitespace-no-wrap">
                {admin_shop.shop_num}
              </p>
            </div>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{admin_shop.name}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {admin_shop.telephone}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {admin_shop.address}
          </p>
        </td>
        <React.Fragment>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <button
              type="button"
              onClick={openModal}
              onChange={admin_shop.id}
              className="text-sm bg-orange-400 text-white w-12 py-1 px-2 rounded outline-none"
            >
              삭제
            </button>
            <DeleteConfirmModal
              handleDelete={(e) => handleDelete(admin_shop.id)}
              open={modalOpen}
              close={closeModal}
              name="admin_shop_bookings"
              header="해당 매장의 정보를 삭제하시겠습니까?"
            />
          </td>
        </React.Fragment>
      </tr>
    </React.Fragment>
  );
}

export default AdminShopComponent;
