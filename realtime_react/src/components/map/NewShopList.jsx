import DebugStates from "components/DebugStates";

function NewShopList({ getData }) {
  return (
    <div>
      {getData
        ?.sort(
          (newShop, newShop2) =>
            new Date(newShop2.registered_date) -
            new Date(newShop.registered_date)
        )
        .slice(0, 5)
        .map((data, index) => {
          return (
            <div>
              <div>{data.name}</div>
              <div>{data.id}</div>
            </div>
          );
          //   address: data.address,
          //   now_table_count: data.now_table_count,
          //   total_table_count: data.total_table_count,
          //   photo: data.photo,
          //   telephone: data.telephone,
          //   holiday: data.holiday,
          //   category: data.category,
        })}
      <DebugStates getData={getData} />
    </div>
  );
}

export default NewShopList;
