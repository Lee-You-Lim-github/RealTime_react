import "../../components//Header/TopNav.css";
import ShopForm from "components/shop/ShopForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PageShopForm() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const [reload, setReload] = useState(false);

  useEffect(() => {}, [reload]);

  return (
    <div className="header">
      <ShopForm
        shopId={shopId}
        handleDidSave={(saveShop) => {
          setReload(true);
          navigate(`/shop/myshop/${saveShop.id}/`);
          // window.location.replace(`/shop/myshop/${saveShop.id}/`);
        }}
      />
    </div>
  );
}

export default PageShopForm;
