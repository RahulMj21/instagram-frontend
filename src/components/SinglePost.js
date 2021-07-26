import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegBookmark, FaRegSmile } from "react-icons/fa";
import {
  IoChatbubbleOutline,
  IoHeartOutline,
  IoHeartSharp,
  IoPaperPlaneOutline,
} from "react-icons/io5";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import moment from "moment";
import axios from "../axios";

const SinglePost = ({ _id, name, userImg, caption, createdAt, imageUrl }) => {
  const user = useSelector(selectUser);

  const [isLiked, setIsLiked] = useState(false);
  const [isReadyToPost, setIsReadyToPost] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  const checkInput = () => {
    if (!inputRef.current.value) {
      setIsReadyToPost(false);
    } else {
      setIsReadyToPost(true);
    }
  };

  const addAComment = async (e) => {
    e.preventDefault();
    if (inputRef.current.value) {
      const response = await axios.post(`/addcomment/${_id}`, {
        comment: inputRef.current.value,
        name: user.name,
      });
      const data = await response.data;
      if (data) {
        inputRef.current.value = "";
        fetchComments();
      }
    }
  };

  const fetchComments = async () => {
    axios
      .get(`/comments/${_id}`)
      .then((res) => {
        setAllComments(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="relative border mt-5 mb-16">
      {/* post header */}
      <div className="flex items-center justify-between p-4">
        {/* left */}
        <div className="flex items-center">
          {!userImg ? (
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-500 p-2 uppercase">
              <p>{name.slice(0, 1)}</p>
            </div>
          ) : (
            <div className="h-8 w-8 rounded__imageContainer">
              <img alt="image" className="rounded__image" src={userImg} />
            </div>
          )}
          <div className="ml-4 flex flex-col cursor-pointer">
            <h2 className="text-sm font-medium hover:underline">{name}</h2>
            <p className="text-xs text-gray-400">
              {moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
          </div>
        </div>
        {/* right */}
        <HiDotsHorizontal className="w-6 h-4 cursor-pointer" />
      </div>
      {/* photo */}
      <img
        alt="image"
        className="h-auto w-full object-cover"
        loading="lazy"
        src={imageUrl}
      />

      {/* like share */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className="icon__post"
            onClick={() => {
              setIsLiked(!isLiked);
            }}
          >
            {!isLiked ? (
              <IoHeartOutline />
            ) : (
              <IoHeartSharp className="text-red-500" />
            )}
          </div>
          <IoChatbubbleOutline className="icon__post transform -rotate-90" />
          <IoPaperPlaneOutline className="icon__post" />
        </div>
        <div>
          <FaRegBookmark className="icon__post" />
        </div>
      </div>

      {/* comments */}
      <div className="flex flex-col space-y-2 p-4 pt-1 border-b">
        {caption && <Comment caption={caption} name={name} />}
        {allComments.length != 0 &&
          allComments.map((comment, index) => (
            <Comment
              id={"comment" + index}
              caption={comment.comment}
              name={comment.name}
            />
          ))}
      </div>

      {/* add a comment */}
      <form onSubmit={addAComment} className="flex items-center p-4">
        <div
          onClick={focusInput}
          className="flex-grow flex items-center space-x-4"
        >
          <FaRegSmile className="icon text-gray-500" />
          <input
            ref={inputRef}
            className="flex-grow focus:outline-none"
            placeholder="Add a Comment"
            type="text"
            onChange={checkInput}
          />
        </div>
        <button
          type="submit"
          className={`text-blue-300 cursor-pointer focus:outline-none  ${
            isReadyToPost && "text-blue-400 font-medium"
          }`}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default SinglePost;
