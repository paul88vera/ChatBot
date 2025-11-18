import "../chatbox.css";
import { useEffect, useRef, useState } from "react";

import { getMessage } from "../api/chat";
import MessageBox from "../props/messageBox";
import ChatBoxBtn from "../props/chatBoxBtn";

const ChatBox = () => {
  const { company } = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const orgId = params.get("orgId");
    return { orgId };
  });
  const [chatbox, setChatbox] = useState();
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const msgRef = useRef(null);

  // Handle Send Message
  async function handleSend(userMessage) {
    // 1️⃣ Add user message immediately
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);

    // 2️⃣ Show AI is typing
    setTyping(true);

    try {
      const res = await getMessage(userMessage); // API call
      // 3️⃣ Append AI message
      setMessages((prev) => [...prev, { sender: "agent", text: res.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "agent", text: "Oops, something went wrong!" },
      ]);
    } finally {
      // 4️⃣ Stop typing animation
      setTyping(false);
    }
  }

  // Message Board Current to top positioning
  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }, [messages]);

  // Toggle Chat Box
  const toggleChatBox = () => {
    setChatbox((current) => !current);
  };

  // Chat Position Left or Right
  const ChatBoxButton = () => {
    if (company.companyDirection == "left") {
      return (
        // ---- LEFT ----
        <ChatBoxBtn
          companyColor={company.companyColor}
          positionStyle={{ left: "2rem" }}
          toggleChatBox={toggleChatBox}
        />
      );
    } else {
      return (
        // ---- Right ----
        <ChatBoxBtn
          companyColor={company.companyColor}
          positionStyle={{ right: "2rem" }}
          toggleChatBox={toggleChatBox}
        />
      );
    }
  };

  // Chat Message Container Left or Right
  const ChatBoxMessageContainer = () => {
    if (company.companyDirection == "left") {
      return (
        // ---- LEFT ----
        <MessageBox
          company={{ ...company }}
          toggleChatBox={toggleChatBox}
          messages={messages}
          positionStyle={{ left: "2rem" }}
          msgRef={msgRef}
          onChoiceClick={handleSend}
          typing={typing}
        />
      );
    } else {
      return (
        // ---- Right ----
        <MessageBox
          company={{ ...company }}
          toggleChatBox={toggleChatBox}
          messages={messages}
          positionStyle={{ right: "2rem" }}
          msgRef={msgRef}
          onChoiceClick={handleSend}
          typing={typing}
        />
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
