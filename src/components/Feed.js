import Posts from "./Posts";
import ViewStatus from "./ViewStatus";

const Feed = () => {
  return (
    <div className="col-span-2 h-screen overflow-y-auto scrollbar-hide pb-20">
      <ViewStatus />
      <Posts />
    </div>
  );
};

export default Feed;
