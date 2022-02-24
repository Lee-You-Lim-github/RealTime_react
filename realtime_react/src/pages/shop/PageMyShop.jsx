import MyShop from "components/shop/MyShop";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function PageMyShop() {
  const { shopId } = useParams();

  return (
    <div>
      <ToastContainer />
      <MyShop shopId={shopId} />
    </div>
  );
}

export default PageMyShop;
