import React from "react";
import { Link, useLoaderData } from "react-router";
import "../dashboard.css";
import { FaCopy } from "react-icons/fa";
import { getCompanies } from "../api/company";
import { BiSolidMessageRoundedDots } from "react-icons/bi";

import { useOrganization } from "@clerk/clerk-react";

const Dashboard = () => {
  const company = useLoaderData();
  const { organization } = useOrganization();

  // filter company for the current organization
  const companyFilter = company.find(
    (comp) => comp.ownerId === organization.id
  );

  return (
    <>
    <div className="header-icon-container">

  <BiSolidMessageRoundedDots className="header-icon" style={{backgroundColor: `${companyFilter.companyColor || "green"}`}} />
    </div>
      <div className="settings-header reg-header">
        <h1>Welcome to ChatBox</h1>
      </div>

      <div className="settings-container">
        <div className="settings-para">
          <p>
            We are here to provide an easy & customizable solution for an
            intuative ChatBox that can learn and use company knowledge to
            provide intelligent answers.
          </p>
        </div>
    <br/>
        {companyFilter.companyChatboxActive == 0 ? (
          <div className="settings-container-sub">
            <div className="settings-para">
              <h2>Customize your new ChatBox using your branding colors</h2>
            </div>
            <Link to={`/${organization.id}/${companyFilter.id}/create`}>
              Create Your ChatBox
            </Link>
          </div>
        ) : (
          <div className="settings-container-sub">
            <div className="settings-para">
              <h2>Customize your existing ChatBox</h2>
            </div>
            <Link to={`/${organization.id}/${companyFilter.id}/settings`}>
              Edit Your ChatBox
            </Link>
          </div>
        )}
        <div className="script-section-container">
          <h2>How to Use ChatBox</h2>
          <p>
            Place this script in the body of your website. That's it! Any edits
            you make to your settings will be automatically implemented in your
            ChatBox.
          </p>
          <div className="script-section">
            <FaCopy
            title="Copy ChatBox"
            className="company-script-cp-icon"
              onClick={() => {
                
                  // Get the text field
                  var copyText = document.getElementById("company-script");

                  // Select the text field
                  copyText.select();
                  copyText.setSelectionRange(0, 99999); // For mobile devices

                  // Copy the text inside the text field
                  navigator.clipboard.writeText(copyText.value);

                  // Alert the copied text
                  alert("Copied script: " + copyText.value);
                
              }}
            />
            <input type="text" id="company-script" defaultValue={`<script src='http://chat.verafied.tech/embed.js' data-company='${companyFilter.id}'></script>`}>
            </input>
          </div>
        </div>
      </div>
    </>
  );
};

async function loader({ request: { signal } }) {
  const company = await getCompanies({ signal });
  return company;
}

export const SettingsRoute = {
  element: <Dashboard />,
  loader,
};

export default React.memo(Dashboard);
