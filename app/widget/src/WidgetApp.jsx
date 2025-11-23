import ChatBox from "./components/ChatBox";
import "./Chatbox.css"; // your fixed button + styles

export default function WidgetApp({ company }) {
  return <ChatBox company={company} />;
}
