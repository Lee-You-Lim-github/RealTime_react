import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import Switch from "react-switch";

function Waitinginshopdashboard({ shopId }) {
  const [auth] = useAuth();
  const [load, setLoading] = useState(false);
  const [checked, setChecked] = useState();
  const [{ data: waiting, loading, error }, refetch] = useApiAxios(
    {
      url: `/waiting/api/waitings/?shop_id=${shopId}`,
      method: "GET",
    },
    { manual: true }
  );

  const [{}, saveShop] = useApiAxios(
    {
      url: `/shop/api/shops/${shopId}/`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  //토글 스위치
  const Handlechange = (checked) => {
    if (checked) {
      saveShop({
        url: `/shop/api/shops/${shopId}/`,
        data: { wait_state: "0" },
      })
        .then((response) => {
          alert("대기를 시작합니다.");
          setLoading(true);
          setChecked(true);
        })
        .catch();
    } else {
      saveShop({
        url: `/shop/api/shops/${shopId}/`,
        data: { wait_state: "1" },
      })
        .then((response) => {
          alert("대기를 중지합니다.");
          setLoading(true);
          setChecked(false);
        })
        .catch();
    }
  };

  useEffect(() => {
    refetch().then((response) => {
      if (response.data.results[0].shop_id?.wait_state === "0") {
        setChecked(true);
      } else {
        setChecked(false);
      }
    });
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;
  return (
    <div>
      <div className="mt-10">오늘의 대기는?</div>
      <div className="text-4xl">
        <p>
          {waiting &&
            waiting?.results.filter(
              (wait) => wait.wait_date.slice(0, 10) === dateString
            ).length}
          건
        </p>
      </div>
      <div className="mt-5">
        <Switch
          className="react-switch"
          id="wait_state"
          onChange={Handlechange}
          checked={checked}
          handleDiameter={25}
          height={30}
          width={60}
        />
      </div>
    </div>
  );
}

export default Waitinginshopdashboard;
