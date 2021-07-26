import { useRef, useState } from "react";
import { HiHome, HiSearch } from "react-icons/hi";
import {
  IoHeartOutline,
  IoPaperPlaneOutline,
  IoCompassOutline,
  IoAddSharp,
} from "react-icons/io5";
import InputBox from "./InputBox";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../slices/userSlice";
import { auth } from "../firebase";
import AddProfileImg from "./AddProfileImg";

const Header = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [showPostModal, setShowPostModal] = useState(false);
  const [showAddDpModal, setShowAddDpModal] = useState(false);
  const [showUserBox, setShowUserBox] = useState(false);
  const inputRef = useRef(null);

  const selectInput = () => {
    inputRef.current.focus();
  };

  const signOut = () => {
    auth.signOut();
    dispatch(logout());
  };

  return (
    <>
      <div className="header bg-white p-5 border-b">
        <div className="flex items-center justify-between max-w-[59rem] mx-auto">
          <img
            alt="image"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            layout="fixed"
          />
          {/* input */}
          <div
            className="hidden md:flex items-center border px-3 py-1 rounded-sm cursor-text"
            onClick={selectInput}
          >
            <HiSearch className="h-5 text-gray-400 mr-1" />
            <input
              ref={inputRef}
              type="text"
              className="flex-grow text-sm focus:outline-none"
              placeholder="Search"
            />
          </div>
          {/* right side buttons */}
          <div className="flex items center space-x-6">
            <HiHome className="icon" />
            <IoPaperPlaneOutline className="icon" />
            <IoCompassOutline className="icon" />
            <IoHeartOutline className="icon" />
            <IoAddSharp
              className="icon text-3xl -mt-1 hover:bg-gray-200"
              onClick={() => setShowPostModal(true)}
            />
            <div
              className="cursor-pointer relative"
              onClick={() => setShowUserBox(!showUserBox)}
            >
              {!user.photo ? (
                <div className=" -mt-1 h-[2rem] w-[2rem] rounded-full flex items-center justify-center bg-gray-200 text-gray-500 p-2 uppercase">
                  <p>{user.name.slice(0, 1)}</p>
                </div>
              ) : (
                <div className="rounded__imageContainer h-[2rem] w-[2rem] -mt-1">
                  <img
                    alt="image"
                    src={user.photo}
                    className="rounded__image h-[2rem] w-[2rem]"
                  />
                </div>
              )}
              {showUserBox && (
                <div className="absolute right-0 whitespace-nowrap z-30 border p-4 flex flex-col space-y-2 items-center bg-white text-gray-400">
                  {!user.photo && (
                    <p
                      onClick={() => setShowAddDpModal(true)}
                      className="hover:text-gray-500 border-b pb-2"
                    >
                      Add profile pic
                    </p>
                  )}
                  <p onClick={signOut} className="hover:text-gray-500">
                    Sign Out
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showPostModal && <InputBox setShowPostModal={setShowPostModal} />}
      {showAddDpModal && (
        <AddProfileImg setShowAddDpModal={setShowAddDpModal} />
      )}
    </>
  );
};

export default Header;
