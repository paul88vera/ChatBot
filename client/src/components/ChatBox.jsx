import { Link } from "react-router-dom";

import { BiSolidMessageRoundedDots } from "react-icons/bi";
// import { MdSend } from "react-icons/md"; // only needed if user has custom reply
import { GiTechnoHeart } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa6";
import { FaUserAstronaut } from "react-icons/fa6";

import "../chatbox.css";
import { useEffect, useRef, useState } from "react";

const ChatBox = ({
  orgColor = "#775151ff",
  orgLink = "https://verafied.tech",
  orgName = "VERAfied.Tech",
  orgDirection = "left",
}) => {
  const [chatbox, setChatbox] = useState();
  // for messages
  // const [messages, setMessages] = useState([]);
  // const [input, setInput] = useState("");

  // const handleSend = async () => {
  //   if (!input.trim()) return;

  //   // Add user message
  //   setMessages((prev) => [...prev, { sender: "user", text: input }]);

  //   const prompt = input;
  //   setInput("");

  //   // Call your API
  //   const res = await fetch("/api/chat", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ message: prompt }),
  //   });

  //   const data = await res.json();

  //   // Add bot reply
  //   setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
  // };

  const msgRef = useRef(null);

  // ============= Just TO TEST =================== vv

  // Need to create support questions using docs and Ai
  const messages = [
    { sender: "user", text: "Hey there! I need help with my dashboard." },
    { sender: "agent", text: "Of course! What seems to be the issue?" },
    { sender: "user", text: "The charts aren't loading on mobile." },
    {
      sender: "agent",
      text: "Got it! I can guide you through fixing that.",
    },
    { sender: "user", text: "dope" },
    { sender: "agent", text: "cool" },
  ];

  // questions derived from company docs given to Ai beforehand
  const questionOptions = [
    "How do I get started?",
    "Do you have API docs?",
    "Can I contact support?",
  ];

  // ============= Just TO TEST =================== ^^
  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChatBox = () => {
    setChatbox((current) => !current);
  };

  // Chat Position Left or Right
  const ChatBoxButton = () => {
    if (orgDirection == "left") {
      return (
        <div
          className="chatbox-btn"
          onClick={() => {
            toggleChatBox();
          }}
          style={{ left: "2rem" }}>
          <BiSolidMessageRoundedDots
            className="chatbox-btn-icon"
            style={{ backgroundColor: orgColor }}
          />
        </div>
      );
    } else {
      return (
        <div
          className="chatbox-btn"
          onClick={() => {
            toggleChatBox();
          }}
          style={{ right: "2rem" }}>
          <BiSolidMessageRoundedDots
            className="chatbox-btn-icon"
            style={{ backgroundColor: orgColor }}
          />
        </div>
      );
    }
  };

  const ChatBoxMessageContainer = () => {
    if (orgDirection == "left") {
      return (
        <div className="chatbox-main" style={{ left: "2rem" }}>
          <div className="chatbox-header" style={{ backgroundColor: orgColor }}>
            <div className="chatbox-header-agent">
              <FaUserAstronaut style={{ fontSize: "2.3rem" }} />
              <div>
                <div>
                  <b>Tron</b>
                </div>
                <div>Ai Agent</div>
              </div>
            </div>
            <div
              className="chatbox-header-exit"
              onClick={() => {
                toggleChatBox();
              }}>
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

            {/* Question choices */}
            <div className="chat-choices">
              {questionOptions.map((q, i) => (
                <button key={i} className="chat-choice-btn msg-user">
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* THIS SECTION IS ONLY FOR ADMIN / DEVELOPMENT */}
          {/* <div className="chatbox-send" style={{ borderColor: orgColor }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <MdSend
            className="chatbox-send-icon"
            onClick={handleSend}
            style={{ color: orgColor }}
          />
        </div> */}
          <div className="chatbox-copyright">
            <p>ChatBox</p>
            <p>
              <GiTechnoHeart style={{ color: orgColor }} />
            </p>

            <Link to={orgLink} target="_blank">
              <b>{orgName}</b>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="chatbox-main" style={{ right: "2rem" }}>
          <div className="chatbox-header" style={{ backgroundColor: orgColor }}>
            <div className="chatbox-header-agent">
              <FaUserAstronaut style={{ fontSize: "2.3rem" }} />
              <div>
                <div>
                  <b>Tron</b>
                </div>
                <div>Ai Agent</div>
              </div>
            </div>
            <div
              className="chatbox-header-exit"
              onClick={() => {
                toggleChatBox();
              }}>
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

            {/* Question choices */}
            <div className="chat-choices">
              {questionOptions.map((q, i) => (
                <button key={i} className="chat-choice-btn msg-user">
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* THIS SECTION IS ONLY FOR ADMIN / DEVELOPMENT */}
          {/* <div className="chatbox-send" style={{ borderColor: orgColor }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <MdSend
            className="chatbox-send-icon"
            onClick={handleSend}
            style={{ color: orgColor }}
          />
        </div> */}
          <div className="chatbox-copyright">
            <p>ChatBox</p>
            <p>
              <GiTechnoHeart style={{ color: orgColor }} />
            </p>

            <Link to={orgLink} target="_blank">
              <b>{orgName}</b>
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="chatbox-container">
      {chatbox ? ChatBoxMessageContainer() : ChatBoxButton()}
    </div>
  );
};

export default ChatBox;
