import ShopDetail from "components/shop/ShopDetail";
import { useParams } from "react-router-dom";

function PageShopDetail() {
  const { shopId } = useParams();
  return (
    <div>
      <ShopDetail shopId={shopId} />
    </div>
  );
}

export default PageShopDetail;
