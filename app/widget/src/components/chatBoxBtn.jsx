import { BiSolidMessageRoundedDots } from "react-icons/bi";

const ChatBoxBtn = ({ toggleChatBox, positionStyle, companyColor }) => {
  return (
    <div className="chatbox-btn" onClick={toggleChatBox} style={positionStyle}>
      <BiSolidMessageRoundedDots
        className="chatbox-btn-icon"
        style={{ backgroundColor: companyColor }}
      />
    </div>
  );
};

export default ChatBoxBtn;
