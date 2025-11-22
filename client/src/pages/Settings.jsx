import { Link, useLoaderData } from "react-router";
import "../Settings.css";
import { getCompanies } from "../api/company";
import { useOrganization } from "@clerk/clerk-react";
import ChatBox from "../components/ChatBox";
import React from "react";

const Settings = () => {
  const company = useLoaderData();
  const { organization } = useOrganization();

  // filter company for the current organization
  const companyFilter = company.find(
    (comp) => comp.ownerId === organization.id
  );

  return (
    <>
        <div className="settings-header reg-header">
          <h1>Welcome to ChatBox</h1>
        </div>

      <div className="settings-container">
        <div className="settings-para">
          <p>We are here to provide an easy & customizable solution for an intuative ChatBox that can learn and use company knowledge to provide intelligent answers.</p>
        </div>

        {companyFilter.companyChatboxActive == 0 ? (
          <div className="settings-container-sub">
          <Link to={`/${organization.id}/${companyFilter.id}/create`}>
            Create Your ChatBox
          </Link>
          <div className="settings-para">
          <p>Customize your new ChatBox using your branding colors.</p>
          </div> 
          </div>
        ) : (
          <div className="settings-container-sub">
          <Link to={`/${organization.id}/${companyFilter.id}/edit`}>
            Edit Your ChatBox
          </Link>
          <div className="settings-para">
          <p>Customize your existing ChatBox.</p>
          </div> 
          </div>
        )}
      </div> 
      <ChatBox company={companyFilter} />
    </>
  );
};

async function loader({ request: { signal } }) {
  const company = await getCompanies({ signal });
  return company;
}

export const SettingsRoute = {
  element: <Settings />,
  loader,
};

export default React.memo(Settings);