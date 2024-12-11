import { useEffect, useState } from "react";
import { FaBell, FaEnvelope, FaCog } from "react-icons/fa";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
      triggerPulseAnimation();
    });
  }, [socket]);

  const triggerPulseAnimation = () => {
    setPulse(true);
    // setTimeout(() => setPulse(false), 1000);
  };

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
    setPulse(false);
  };

  return (
    <div className="navbar">
      <span className="logo"> Insta clone</span>
      <div className="icons">
        <div
          className={`icon ${pulse ? "pulse-infinite" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <FaBell className="iconImg" />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
        <div className="icon">
          <FaEnvelope className="iconImg" />
        </div>
        <div className="icon">
          <FaCog className="iconImg" />
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n, index) => (
            <div key={index}>{displayNotification(n)}</div>
          ))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
