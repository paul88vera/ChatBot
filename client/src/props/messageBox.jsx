import { useState } from "react";
import { FaChevronDown, FaUserAstronaut } from "react-icons/fa6";
import { GiTechnoHeart } from "react-icons/gi";
import { MdSend } from "react-icons/md";

import { Link } from "react-router";

const MessageBox = ({
  positionStyle,
  messages,
  toggleChatBox,
  company,
  msgRef,
  onChoiceClick,
  typing,
}) => {
  const [input, setInput] = useState("");
  return (
    <div className="chatbox-main" style={positionStyle}>
      <div
        className="chatbox-header"
        style={{ backgroundColor: company.companyColor }}>
        <div className="chatbox-header-agent">
          <FaUserAstronaut style={{ fontSize: "2.3rem" }} />
          <div>
            <div>
              <b>Tron</b>
            </div>
            <div>Ai Agent</div>
          </div>
        </div>
        <div className="chatbox-header-exit" onClick={toggleChatBox}>
          <FaChevronDown style={{ fontSize: "1.3rem" }} />
        </div>
      </div>
      <div className="chatbox-msg" ref={msgRef}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.sender === "user" ? "msg-user" : "msg-agent"}>
            {m.text}
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="msg-agent typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        {/* Question choices - TODO: NEEDS WORK */}
        {/* <div className="chat-choices">
          {company.companyFaqs.map((q, i) => (
            <button
              key={i}
              className="chat-choice-btn msg-user"
              onClick={() => onChoiceClick(q)}>
              {q}
            </button>
          ))}
        </div> */}
      </div>

      <div
        className="chatbox-send"
        style={{ borderColor: company.companyColor }}>
        <input
          type="text"
          className="chatbox-send-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && onChoiceClick(input) && setInput("")
          }
        />
        <MdSend
          className="chatbox-send-icon"
          onClick={() => onChoiceClick(input) && setInput("")}
          style={{ color: company.companyColor }}
        />
      </div>
      <div className="chatbox-copyright">
        <p>ChatBox</p>
        <p>
          <GiTechnoHeart style={{ color: company.companyColor }} />
        </p>

        <Link to={company.companyLink} target="_blank">
          <b>{company.companyWebsite}</b>
        </Link>
      </div>
    </div>
  );
};

export default MessageBox;
