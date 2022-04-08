import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";

function Myshopinshopdashboard({ shopId }) {
  const [auth] = useAuth();
  const [
    { data: myShopData, laoding: myShopLaoding, error: myShopError },
    refetch,
  ] = useApiAxios(
    {
      url: `/shop/api/shops/${shopId}/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );
  useEffect(() => {
    refetch();
  }, [shopId]);

  // 현재 테이블 수 값 변경
  const [tableCount, setTableCount] = useState(0);

  // PATCH_shop: 현재 테이블 수 수정
  const [{ loading, error }, saveRuquest] = useApiAxios(
    {
      url: `/shop/api/shops/${shopId}/`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    setTableCount(myShopData?.now_table_count);
  }, [myShopData]);

  // Plus를 눌렀을 때(전체 테이블 수보다 추가할 수 없음.)
  const handlePlus = () => {
    setTableCount((prevTableCount) => {
      if (prevTableCount === myShopData.total_table_count) {
        return prevTableCount;
      } else {
        return prevTableCount + 1;
      }
    });
  };

  // Minus를 눌렀을 때(현재 테이블 수가 0 or -1이상일 경우 감소시킬 수 없음.)
  const handleMinus = () => {
    setTableCount((prevTableCount) => {
      if (prevTableCount > 0) {
        return prevTableCount - 1;
      } else {
        return prevTableCount;
      }
    });
  };

  // 변경된 now_table_count 값 저장
  useEffect(() => {
    saveRuquest({
      data: { now_table_count: tableCount },
    })
      .then((response) => {
        setTableCount(response.data.now_table_count);
      })
      .catch();
  }, [tableCount]);

  return (
    <div className="text-gray-800">
      <div className="mt-10">현재 테이블 수는?</div>
      <div className="text-2xl">
        <p>
          {tableCount}/{myShopData?.total_table_count}
        </p>
      </div>
      <div className="mt-4">
        <button
          type="button"
          name="plus"
          onClick={handlePlus}
          className="mr-4 w-10 h-10 border-2 border-white text-2xl text-white rounded p-1"
        >
          +
        </button>
        <button
          type="button"
          name="minus"
          onClick={handleMinus}
          className="w-10 h-10 border-2 border-white text-2xl text-white rounded p-1"
        >
          -
        </button>
      </div>
    </div>
  );
}

export default Myshopinshopdashboard;
