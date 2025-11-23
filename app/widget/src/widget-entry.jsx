import { createRoot } from "react-dom/client";
import WidgetApp from "./WidgetApp.jsx"; // make sure this path is correct

window.ChatWidget = {
  mount: (container, props) => {
    const root = createRoot(container);
    root.render(<WidgetApp company={props} />);
  }
};
