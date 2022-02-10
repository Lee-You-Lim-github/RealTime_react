import "../../components//Header/TopNav.css";
import ShopJoinForm from "components/accounts/ShopJoinForm";
import { useNavigate, useParams } from "react-router-dom";

function PageShopJoin() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="header">
      <ShopJoinForm
        shopId={shopId}
        handleDidSave={(saveShop) => navigate(`#`)}
      />
    </div>
  );
}

export default PageShopJoin;
