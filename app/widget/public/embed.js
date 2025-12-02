(async function () {
  try {
    const scriptTag = document.currentScript;
    const publicId = scriptTag.getAttribute("data-company");

    if (!publicId) {
      console.error("ChatWidget: No publicId provided");
      return;
    }

    // Create container
    const container = document.createElement("div");
    container.id = "chatbox-widget-container";
    document.body.appendChild(container);

    // Inject widget CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "http://chat.verafied.tech.s3-website-us-east-1.amazonaws.com/widget.css";
    document.head.appendChild(link);

    // Fetch company data
    const res = await fetch(`http://localhost:5400/api/company/${publicId}`); // company publicId
    const result = await res.json();
    const company = result.data || result;

    // Inject widget JS
    const w = document.createElement("script");
    w.src = "http://chat.verafied.tech.s3-website-us-east-1.amazonaws.com/widget.iife.js";
    w.onload = () => {
      if (window.ChatWidget && typeof window.ChatWidget.mount === "function") {
        window.ChatWidget.mount(container, company);
      } else {
        console.error("ChatWidget not defined");
      }
    };
    document.head.appendChild(w);
  } catch (err) {
    console.error("Failed to load ChatWidget", err);
  }
})();
