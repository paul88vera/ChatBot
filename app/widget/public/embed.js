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
    link.href = "https://d11lfamd8dwl3d.cloudfront.net/widget.css";
    document.head.appendChild(link);

    // Fetch company data
<<<<<<< HEAD
    const res = await fetch(`http://chatbox.verafied.tech/api/company/${publicId}`); // company publicId
    // const res = await fetch(`http://localhost:5400/api/company/${publicId}`); // dev only 
=======
    const res = await fetch(`https://server.verafied.tech/api/company/${publicId}`); // company publicId
>>>>>>> develop
    const result = await res.json();
    const company = result.data || result;

    // Inject widget JS
    const w = document.createElement("script");
    w.src = "https://d11lfamd8dwl3d.cloudfront.net/widget.iife.js";
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
