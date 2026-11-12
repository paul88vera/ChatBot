import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import WidgetApp from "./WidgetApp.jsx";

window.ChatWidget = {
  mount: (container, company) => {
    const root = createRoot(container);
    root.render(
      <MemoryRouter>
        <WidgetApp company={company} />
      </MemoryRouter>
    );
  }
};
