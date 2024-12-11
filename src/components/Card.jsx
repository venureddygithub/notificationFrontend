import { FaHeart, FaRegHeart, FaComment, FaShareAlt, FaInfoCircle } from "react-icons/fa";
import { useState } from "react";

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    type === 1 && setLiked((prev)=>!prev);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <FaHeart className="cardIcon" style={{ color: "red" }} />
        ) : (
          <FaRegHeart
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        )}
        <FaComment
          className="cardIcon"
          onClick={() => handleNotification(2)}
        />
        <FaShareAlt
          className="cardIcon"
          onClick={() => handleNotification(3)}
        />
        <FaInfoCircle className="cardIcon infoIcon" />
      </div>
    </div>
  );
};

export default Card;
