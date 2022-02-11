import "../../components//Header/TopNav.css";
import ShopForm from "components/shop/ShopForm";
import { useNavigate, useParams } from "react-router-dom";

function PageShopForm() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="header">
      <ShopForm
        shopId={shopId}
        handleDidSave={(saveShop) => navigate("/shop/:shopId/")}
      />
    </div>
  );
}

export default PageShopForm;
