import MyShop from "components/shop/MyShop";
import { useParams } from "react-router-dom";

function PageMyShop() {
  const { shopId } = useParams();

  return (
    <div>
      <MyShop shopId={shopId} />
    </div>
  );
}

export default PageMyShop;
