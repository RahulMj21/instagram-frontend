import IndividualSuggestion from "./IndividualSuggestion";
import { IoEllipseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import suggestions from "../data/suggestions";

const Suggestions = () => {
  const user = useSelector(selectUser);
  return (
    <div className="col-span-1 hidden lg:flex flex-col py-5 space-y-6">
      {/* user info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {!user.photo ? (
            <div className="text-2xl -mt-1 h-[3.8rem] w-[3.8rem] rounded-full flex items-center justify-center bg-gray-200 text-gray-500 p-2 uppercase">
              <p>{user.name.slice(0, 1)}</p>
            </div>
          ) : (
            <div className="rounded__imageContainer h-14 w-14">
              <img alt="image" className="rounded__image" src={user.photo} />
            </div>
          )}
          <div>
            <h2 className="text-sm font-medium text-gray-400">{user.name}</h2>
          </div>
        </div>
        <p className="text-blue-400 text-xs font-medium cursor-pointer">
          Switch
        </p>
      </div>

      {/* follow suggession */}
      <div>
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-gray-400 text-sm font-medium">
            Suggestions For You
          </h2>
          <p className="text-xs cursor-pointer">See All</p>
        </div>
        {/* individual suggession */}
        {suggestions.map((suggestion, index) => {
          return <IndividualSuggestion id={index} {...suggestion} />;
        })}
      </div>
      {/* suggestion footer */}
      <div>
        <div className="text-xs text-gray-300 flex">
          <span className="suggestions__footer">
            About
            <IoEllipseSharp className="h-1" />
          </span>

          <span className="suggestions__footer">
            Help
            <IoEllipseSharp className="h-1" />
          </span>
          <span className="suggestions__footer">
            Press
            <IoEllipseSharp className="h-1" />
          </span>
          <span className="suggestions__footer">
            API
            <IoEllipseSharp className="h-1" />
          </span>
          <span className="suggestions__footer">
            Jobs
            <IoEllipseSharp className="h-1" />
          </span>
          <span className="suggestions__footer">
            Privacy
            <IoEllipseSharp className="h-1" />
          </span>
          <span className="suggestions__footer">
            Terms
            <IoEllipseSharp className="h-1" />
          </span>
        </div>
        <div className="text-xs text-gray-300 flex">
          <span className="suggestions__footer">
            Locations
            <IoEllipseSharp className="h-1" />
          </span>
          <span className="suggestions__footer">
            Top_Accounts
            <IoEllipseSharp className="h-1" />
          </span>
          <span className="suggestions__footer">
            Hashtags
            <IoEllipseSharp className="h-1" />
          </span>
          <span className="suggestions__footer">
            Languages
            <IoEllipseSharp className="h-1" />
          </span>
        </div>
        <div className="text-xs text-gray-300 flex">
          <span className="suggestions__footer">English</span>
        </div>
      </div>
      <div className="text-xs text-gray-300 uppercase">
        &copy; 2021 instagram from rahulmj21
      </div>
    </div>
  );
};

export default Suggestions;
