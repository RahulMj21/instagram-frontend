import { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login } from "../slices/userSlice";
import { storage } from "../firebase";
import { auth } from "../firebase";

const AddProfileImg = ({ setShowAddDpModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [imageToPost, setImageToPost] = useState(null);
  const filePickerRef = useRef(null);

  const addToProfile = async (e) => {
    e.preventDefault();

    const uploadTask = await storage
      .ref("userImages")
      .child(user.id)
      .putString(imageToPost, "data_url");

    await console.log(uploadTask);

    await uploadTask.task.on(
      "state_change",
      null,
      (error) => console.log(error),
      () =>
        storage
          .ref("userImages")
          .child(user.id)
          .getDownloadURL()
          .then((url) => {
            auth.currentUser.updateProfile({
              photoURL: url,
            });
            dispatch(
              login({
                ...user,
                photo: url,
              })
            );
          })
    );
    setShowAddDpModal(false);
  };
  const addImageToPost = (e) => {
    e.preventDefault();
    if (window.FileReader) {
      const reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.onload = (event) => {
        setImageToPost(event.target.result);
      };
    }
  };

  const closeModal = () => {
    setImageToPost(null);
    setShowAddDpModal(false);
  };

  return (
    <div className="absolute h-[100vh] w-full">
      {/* overlay */}
      <div className="fixed h-full w-full bg-black z-10 filter opacity-[0.9] top-0 left-0 "></div>

      {/* add post section */}
      <div className="fixed w-[90%] sm:w-[32rem] top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-gray-50 mx-auto z-50 rounded-md">
        <div className="flex items-center space-x-2 p-5 border-b">
          {!user.photo ? (
            <div className="-mt-1 h-[2rem] w-[2rem] rounded-full flex items-center justify-center bg-gray-200 text-gray-500 p-2 uppercase">
              <p>{user.name.slice(0, 1)}</p>
            </div>
          ) : (
            <div className="rounded__imageContainer h-8 w-8">
              <img alt="" className="rounded__image" src={user.photo} />
            </div>
          )}
          <h2 className="text-sm text-gray-400">{user.name}</h2>
        </div>
        <form className="p-5 text-center">
          {imageToPost ? (
            <>
              <img
                loading="lazy"
                alt="image"
                src={imageToPost}
                className="pb-4 object-contain w-auto h-32 mx-auto"
              />
              <div className="text-center flex flex-col py-4">
                <button
                  type="submit"
                  onClick={addToProfile}
                  className="bg-blue-500 px-6 py-2 focus:outline-none text-white rounded-md tracking-wide hover:bg-blue-400 cursor-pointer"
                >
                  Click to Add
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => filePickerRef.current.click()}
                className="bg-blue-500  focus:outline-none hover:bg-blue-400 px-4 py-2 tracking-wide text-gray-50 rounded-[40px]"
              >
                Choose a Photo
              </button>
              <input
                type="file"
                ref={filePickerRef}
                onChange={addImageToPost}
                hidden
              />
            </>
          )}
        </form>
      </div>
      {/* close the window */}
      <FaTimes
        onClick={closeModal}
        className="fixed right-8 top-10 h-8 w-8 text-red-500 z-50 shadow-xl cursor-pointer"
      />
    </div>
  );
};

export default AddProfileImg;
