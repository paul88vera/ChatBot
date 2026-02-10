import { useState } from "react";
import { FaChevronDown, FaUserAstronaut } from "react-icons/fa6";
import { GiTechnoHeart } from "react-icons/gi";
import { MdSend } from "react-icons/md";

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
        {company.avatarUrl ? (
          <img src={company.avatarUrl} alt="Agent Avatar" className="agent-avatar" />
        ) : (
          <FaUserAstronaut style={{ fontSize: "2.3rem" }} />
        )}
          <div>
            <div>
              <b>{company.agentName || 'Tron'}</b>
            </div>
            <div>{company.agentSubtitle || 'AI Agent'}</div>
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

        {!messages || messages.length === 0 ? (
          <div className="msg-agent">
            {company.welcomeMessage || "Hello! How can I assist you today?"}
          </div>
        ) : null}

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
        <p>ChatBox Inc.</p>
        <p>
          <GiTechnoHeart style={{ color: company.companyColor, marginTop:'.4rem' }} />
        </p>

        <a href={company.brandLink || 'https://chatbox.verafied.tech'} target="_blank">
          <b>{company.brandName || 'VERAfied.Tech'}</b>
        </a>
      </div>
    </div>
  );
};

export default MessageBox;
