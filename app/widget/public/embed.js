// (function () {
//   const scriptTag = document.currentScript;
//   const orgId = scriptTag.getAttribute("data-org");

//   const container = document.createElement("div");
//   container.id = "chatbox-widget-container";
//   document.body.appendChild(container);

//   // Inject widget CSS
//   const link = document.createElement("link");
//   link.rel = "stylesheet";
//   link.href = "http://localhost:5400/widget/widget.css"; // or your CDN path
//   document.head.appendChild(link);

//   // Fetch company data
//   fetch(`http://localhost:5400/api/company/${orgId}`)
//   .then(res => res.json()) // parse JSON first
//   .then(result => {
//     const company = result.data || result; // depends on your server response
//     console.log("Company fetched:", company);

//     const w = document.createElement("script");
//     w.src = "http://localhost:5400/widget/widget.iife.js";
//     w.onload = () => {
//       if (window.ChatWidget && typeof window.ChatWidget.mount === "function") {
//         window.ChatWidget.mount(container, company);
//       } else {
//         console.error("ChatWidget not defined");
//       }
//     };
//     document.head.appendChild(w);
//   })
//   .catch(err => console.error("Failed to load company data", err));

// })();

(async function () {
  try {
    const scriptTag = document.currentScript;
    const orgId = scriptTag.getAttribute("data-org");

    if (!orgId) {
      console.error("ChatWidget: No orgId provided");
      return;
    }

    // Create container
    const container = document.createElement("div");
    container.id = "chatbox-widget-container";
    document.body.appendChild(container);

    // Inject widget CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "http://localhost:5400/widget/widget.css"; // or your CDN path
    document.head.appendChild(link);

    // Fetch company data
    const res = await fetch(`http://localhost:5400/api/company/${orgId}`);
    const result = await res.json();
    const company = result.data || result;

    // Fallback defaults
    // const finalCompany = {
    //   id: company?.id || "demo",
    //   companyName: company?.companyName || "Demo Company",
    //   companyColor: company?.companyColor || "#ac29c3ff",
    //   companyDirection: company?.companyDirection || "right",
    // };

    // console.log("Company fetched:", company, company.id, company[0]?.id);

    // Inject widget JS
    const w = document.createElement("script");
    w.src = "http://localhost:5400/widget/widget.iife.js"; // or CDN path
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
