import PickList from "components/pick/PickList";
import PageUserSidebar from "pages/user/PageUserSidebar";

function PagePickList() {
  return (
    <div className="grid grid-cols-8">
      <div className="grid col-span-2">
        <PageUserSidebar />
      </div>
      <div className="grid col-span-5 auto-rows-max">
        <PickList />
      </div>
    </div>
  );
}

export default PagePickList;
