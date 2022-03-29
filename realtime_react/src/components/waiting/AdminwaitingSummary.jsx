function AdminwaitingSummary({ wait, index }) {
  return (
    <div>
      <div>
        <div>{index + 1}</div>
        <div>{wait.shop_id.shop_num}</div>
        <div>{wait.shop_id.name}</div>
        <div>{wait.user_id.user_id}</div>
        <div>{wait.user_id.username}</div>
        <div>{wait.user_id.telephone}</div>
        <div>{wait.wait_date.slice(0, 10)}</div>
        <div>{wait.wait_date.slice(11, 16)}</div>

        <div>{wait.wait_table_count}</div>
        <div>
          <div>{wait.wait_visit_status === "1" && <div>방문</div>}</div>
          <div>{wait.wait_visit_status === "0" && <div>방문예정</div>}</div>
        </div>
        <div>-------------------------------------</div>
      </div>
    </div>
  );
}

export default AdminwaitingSummary;
