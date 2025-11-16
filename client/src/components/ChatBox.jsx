import { Link } from "react-router-dom";

import { BiSolidMessageRoundedDots } from "react-icons/bi";
// import { MdSend } from "react-icons/md"; // only needed if user has custom reply
import { GiTechnoHeart } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa6";
import { FaUserAstronaut } from "react-icons/fa6";

import "../chatbox.css";
import { useEffect, useRef, useState } from "react";

// GROK
// import OpenAI from "openai";
// const XAI_API_KEY = import.meta.env.XAI_API_KEY;

const ChatBox = () => {
  const [chatbox, setChatbox] = useState();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [company] = useState({
    ownerId: import.meta.env.VIT_TEMP_ORGID,
    companyName: "Verafied Tech",
    companyEmail: "support@verafied.tech",
    companyWebsite: "VERAfied.Tech", // what shows on copyright section
    companyLink: "https://verafied.tech",
    companyDescription: "...",
    companyFaqs: [
      "What services do you offer?",
      "Do you have monthly pricing?",
      "What technologies do you use?",
    ],
    companyColor: "#123456",
    companyDirection: "right",
  });

  // ====== GROK =======

  // const client = new OpenAI({
  //   baseURL: "https://api.x.ai/v1",
  //   apiKey: XAI_API_KEY,
  // });

  // const completion = await client.chat.completions.create({
  //   model: "grok-3-mini",
  //   messages: [
  //     {
  //       role: "system",
  //       content: systemPrompt,
  //     },
  //     {
  //       role: "user",
  //       content: messages,
  //     },
  //   ],
  //   temperature: 0,
  // });
  // console.log(completion.choices[0].message);
  // ====== GROK =======

  // ============= For Messages ================ NOT GROK vv
  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    const prompt = input;
    setInput("");

    // Call your API
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt }),
    });

    const data = await res.json();

    // Add bot reply
    setMessages((prev) => [...prev, { sender: "system", text: data.reply }]);
  };

  const msgRef = useRef(null);

  // =========== For Message TEST =============== NOT GROK ^^

  // ============= Just TO TEST =================== vv

  // Need to create support questions using docs and Ai
  // const messages = [
  //   { sender: "user", text: "Hey there! I need help with my dashboard." },
  //   { sender: "agent", text: "Of course! What seems to be the issue?" },
  //   { sender: "user", text: "The charts aren't loading on mobile." },
  //   {
  //     sender: "agent",
  //     text: "Got it! I can guide you through fixing that.",
  //   },
  //   { sender: "user", text: "dope" },
  //   { sender: "agent", text: "cool" },
  // ];

  // questions derived from company docs given to Ai beforehand
  // const questionOptions = [
  //   "How do I get started?",
  //   "Do you have API docs?",
  //   "Can I contact support?",
  // ];

  // ============= Just TO TEST =================== ^^

  // Message Board Current to top positioning
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
    if (company.companyDirection == "left") {
      return (
        <div
          className="chatbox-btn"
          onClick={() => {
            toggleChatBox();
          }}
          style={{ left: "2rem" }}>
          <BiSolidMessageRoundedDots
            className="chatbox-btn-icon"
            style={{ backgroundColor: company.companyColor }}
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
            style={{ backgroundColor: company.companyColor }}
          />
        </div>
      );
    }
  };

  const ChatBoxMessageContainer = () => {
    if (company.companyDirection == "left") {
      return (
        <div className="chatbox-main" style={{ left: "2rem" }}>
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
              {company.CompanyFaqs.map((q, i) => (
                <button key={i} className="chat-choice-btn msg-user">
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* THIS SECTION IS ONLY FOR ADMIN / DEVELOPMENT */}
          {/* <div className="chatbox-send" style={{ borderColor: company.companyColor }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <MdSend
            className="chatbox-send-icon"
            onClick={handleSend}
            style={{ color: company.companyColor }}
          />
        </div> */}
          <div className="chatbox-copyright">
            <p>ChatBox</p>
            <p>
              <GiTechnoHeart style={{ color: company.companyColor }} />
            </p>

            <Link to={company.companyLink} target="_blank">
              <b>{company.companyName}</b>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="chatbox-main" style={{ right: "2rem" }}>
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
              {company.companyFaqs.map((q, i) => (
                <button key={i} className="chat-choice-btn msg-user">
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* THIS SECTION IS ONLY FOR ADMIN / DEVELOPMENT */}
          {/* <div className="chatbox-send" style={{ borderColor: company.companyColor }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <MdSend
            className="chatbox-send-icon"
            onClick={handleSend}
            style={{ color: company.companyColor }}
          />
        </div> */}
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
    }
  };

  return (
    <div className="chatbox-container">
      {chatbox ? ChatBoxMessageContainer() : ChatBoxButton()}
    </div>
  );
};

export default ChatBox;
