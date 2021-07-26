import { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { auth, storage } from "../firebase";
import firebase from "firebase";
import axios from "../axios";
import uuid from "react-uuid";

const InputBox = ({ setShowPostModal }) => {
  const user = useSelector(selectUser);
  const [imageToPost, setImageToPost] = useState(null);
  const [currentImageId, setCurrentImageId] = useState(null);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);

  const sendPost = async (e) => {
    e.preventDefault();

    setCurrentImageId(uuid());

    const uploadTask = await storage
      .ref("posts")
      .child(currentImageId)
      .putString(imageToPost, "data_url");

    uploadTask.task.on(
      "state_change",
      null,
      (err) => console.log(err),
      () => {
        storage
          .ref("posts")
          .child(currentImageId)
          .getDownloadURL()
          .then(async (url) => {
            try {
              const res = await axios.post(`/upload`, {
                caption: captionRef.current.value,
                name: user.name,
                imageUrl: url,
                userImg: user.photo,
                comments: [],
              });

              setShowPostModal(false);
              setCurrentImageId(false);
              setImageToPost(null);
            } catch (error) {
              console.log(error);
            }
          });
      }
    );
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
    setShowPostModal(false);
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
              <img
                alt="image"
                className="rounded__image h-8 w-8"
                src={user.photo}
              />
            </div>
          )}
          <h2 className="text-sm text-gray-400">{user.name}</h2>
        </div>
        <form className="p-5 text-center">
          {imageToPost ? (
            <>
              <img
                alt="image"
                src={imageToPost}
                className="pb-4 object-contain w-auto h-32 mx-auto"
              />
              <div className="flex items-center space-x-4 pb-4">
                <input
                  type="text"
                  ref={captionRef}
                  placeholder="Add a caption"
                  className="flex-grow px-2 py-1 bg-white rounded-md focus:outline-none border placeholder-gray-300"
                />
                <button
                  type="submit"
                  onClick={sendPost}
                  className="bg-blue-500 px-6 py-2 text-white rounded-[40px] tracking-wide hover:bg-blue-400 cursor-pointer focus:outline-none"
                >
                  Post
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

export default InputBox;
