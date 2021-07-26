import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useState } from "react";

const Comment = ({ caption, name }) => {
  const [commentLiked, setCommentLiked] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-grow">
        <h2 className="text-md hover:underline font-medium">{name}</h2>
        <p className="text-md ml-2 text-gray-500">{caption}</p>
      </div>
      <div
        className="text-md cursor-pointer"
        onClick={() => {
          setCommentLiked(!commentLiked);
        }}
      >
        {!commentLiked ? (
          <IoHeartOutline />
        ) : (
          <IoHeartSharp className="text-red-500" />
        )}
      </div>
    </div>
  );
};

export default Comment;
