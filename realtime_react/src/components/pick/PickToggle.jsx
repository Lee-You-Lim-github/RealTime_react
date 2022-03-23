import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { EmptyHeart, FilledHeart } from "./PickHeart";

function PickToggle({ shop, pick, user_id, reload }) {
  const [auth] = useAuth();

  const [picks, setPick] = useState(false);

  const [, makePick] = useApiAxios(
    {
      url: `/user/api/picks/`,
      method: "POST",
    },
    { manual: true }
  );

  const [, deleteWish] = useApiAxios(
    {
      url: `/user/api/picks/${pick?.id}/`,
      method: "DELETE",
    },
    { manual: true }
  );

  useEffect(() => {
    pick ? setPick(true) : setPick(false);
  }, [pick, auth]);

  const handleDelete = () => {
    deleteWish(
      {
        url: `/user/api/picks/${pick?.id}/`,
        method: "DELETE",
      },
      { manual: true }
    ).then(() => {
      setPick(false);

      alert("찜 해제 되었습니다💥");
    });
  };

  const handleSave = () => {
    makePick({
      data: { shop_id: shop.id, user_id: user_id },
    }).then(() => {
      window.confirm("찜 되었습니다😘");
      setPick(true);
      reload();
    });
  };

  return (
    <div className="flex">
      {picks ? (
        <div onClick={handleDelete}>
          <FilledHeart />
        </div>
      ) : (
        <div onClick={handleSave}>
          <EmptyHeart />
        </div>
      )}
    </div>
  );
}

export default PickToggle;
