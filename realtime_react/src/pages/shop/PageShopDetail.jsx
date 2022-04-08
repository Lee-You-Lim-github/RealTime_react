import ShopDetail from "components/shop/ShopDetail";
import { useParams } from "react-router-dom";

function PageShopDetail() {
  const { shopId } = useParams();
  return (
    <div className="grid grid-cols-8">
      <div className="col-start-2 col-span-6">
        <ShopDetail shopId={shopId} />
      </div>
    </div>
  );
}

export default PageShopDetail;
