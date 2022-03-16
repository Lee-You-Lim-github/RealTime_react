import React from "react";

function ShopWaitingList({ shopwaiting }) {
  return (
    <div>
      <span className="mx-10">{shopwaiting.wait_count}</span>
      <span className="mx-10">{shopwaiting.user_id.username}</span>
      <span className="mx-10">{shopwaiting.user_id.telephone}</span>
      <span className="mx-10">{shopwaiting.wait_table_count}</span>
      <span className="mx-10">{shopwaiting.wait_date.slice(11, 16)}</span>
      <span className="mx-10">
        <button>요청</button>
      </span>
      <span className="mx-3">
        <button>입장</button>
      </span>
      <span>
        <button>미입장</button>
      </span>
    </div>
  );
}

export default ShopWaitingList;
