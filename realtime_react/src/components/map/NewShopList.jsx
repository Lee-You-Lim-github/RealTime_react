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
      <div
        style={{
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 64,
        }}
      >
        <ShopCarousel show={3}>
          <div>
            <div style={{ padding: 8 }}>
              <img
                src={shopData[0].photo1}
                alt="placeholder"
                style={{ width: "100%" }}
              />
              <div>{shopData[0].name}</div>
            </div>
          </div>
          <div>
            <div style={{ padding: 8 }}>
              <img
                src="https://via.placeholder.com/300x300"
                alt="placeholder"
                style={{ width: "100%" }}
              />
              <div>{shopData[1].name}</div>
            </div>
          </div>
          <div>
            <div style={{ padding: 8 }}>
              <img
                src="https://via.placeholder.com/300x300"
                alt="placeholder"
                style={{ width: "100%" }}
              />
              <div>{shopData[2].name}</div>
            </div>
          </div>
          <div>
            <div style={{ padding: 8 }}>
              <img
                src="https://via.placeholder.com/300x300"
                alt="placeholder"
                style={{ width: "100%" }}
              />
              <div>{shopData[3].name}</div>
            </div>
          </div>
          <div>
            <div style={{ padding: 8 }}>
              <img
                src="https://via.placeholder.com/300x300"
                alt="placeholder"
                style={{ width: "100%" }}
              />
              <div>{shopData[4].name}</div>
            </div>
          </div>
        </ShopCarousel>
      </div>
    </>
  );
}

export default NewShopList;
