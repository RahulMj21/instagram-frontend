import SingleStatus from "./SingleStatus";
import status from "../data/status";

const ViewStatus = () => {
  return (
    <div className="border p-5 flex justify-between space-x-6 overflow-x-auto scrollbar-hide">
      {status.map((item) => {
        return <SingleStatus id={item.id} {...item} />;
      })}
    </div>
  );
};

export default ViewStatus;
