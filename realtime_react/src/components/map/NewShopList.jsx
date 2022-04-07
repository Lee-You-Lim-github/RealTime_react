import DebugStates from "components/DebugStates";
import ShopCarousel from "components/map/ShopCarousel";
import { Link } from "react-router-dom";

function NewShopList({ listData }) {
  const shopData = listData
    ?.sort(
      (newShop, newShop2) =>
        new Date(newShop2.registered_date) - new Date(newShop.registered_date)
    )
    .slice(0, 5);

  console.log(shopData);

  return (
    <>
      신규 매장
      <div
        style={{
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 64,
        }}
      >
        <ShopCarousel show={3}>
          {shopData.map((data, index) => (
            <div>
              <Link to={`/shop/${data.id}/`}>
                <div style={{ padding: 8 }}>
                  <img
                    src={data.photo1}
                    alt="placeholder"
                    style={{ width: "100%" }}
                  />
                  <div>{data.name}</div>
                </div>
              </Link>
            </div>
          ))}
        </ShopCarousel>
      </div>
    </>
  );
}

export default NewShopList;
