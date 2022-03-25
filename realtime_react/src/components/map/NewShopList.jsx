import DebugStates from "components/DebugStates";
import ShopCarousel from "components/map/ShopCarousel";

function NewShopList({ getData }) {
  const shopData = getData
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
              <div>
                <div style={{ padding: 8 }}>
                  <img
                    src={data.photo1}
                    alt="placeholder"
                    style={{ width: "100%" }}
                  />
                  <div>{data.name}</div>
                </div>
              </div>
            </div>
          ))}
        </ShopCarousel>
      </div>
    </>
  );
}

export default NewShopList;
