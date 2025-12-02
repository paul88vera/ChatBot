import { getCompanies } from "./src/api/company";

const inputCompanyScript = async () => {
  const body = document.getElementById("main");

  // Get org from window.Clerk
  const orgId = window.Clerk?.organization?.id;

  // If Clerk hasn't loaded yet, wait a moment
  if (!orgId) {
    console.warn("Clerk not ready yet. Retrying...");
    setTimeout(inputCompanyScript, 200); 
    return;
  }

  // Fetch company from your backend
  const company = await getCompanies();

const companyFilter = company.find((element) => element.ownerId === orgId);

// If nothing matches, stop here.
if (!companyFilter) {
  console.log("No company matches this org.");
  return;
}

// Compare IDs correctly
if (orgId === companyFilter.ownerId) {
  // return; // same org → no script needed
  
  
  // Inject script
  const script = document.createElement("script");
  script.src = "http://chat.verafied.tech.s3-website-us-east-1.amazonaws.com/";
  script.setAttribute("data-company", companyFilter.publicId);
  script.async = true;
  
  return body.appendChild(script);
} else {
  return
}
};

inputCompanyScript();
