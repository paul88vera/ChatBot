import { Link, useLoaderData } from "react-router";
import "../Settings.css";
import { getCompanies } from "../api/company";
import { useOrganization } from "@clerk/clerk-react";
import ChatBox from "../components/ChatBox";

const Settings = () => {
  const company = useLoaderData();
  const { organization } = useOrganization();

  // filter company for the current organization
  const companyFilter = company.find(
    (comp) => comp.ownerId === organization.id
  );

  return (
    <>
      <h1>Welcome to ChatBox</h1>

      <div className="settings-container">
        {companyFilter.companyChatboxActive == 0 ? (
          <Link to={`/${organization.id}/${companyFilter.id}/create`}>
            create your ChatBox
          </Link>
        ) : (
          <Link to={`/${organization.id}/${companyFilter.id}/edit`}>
            edit your ChatBox
          </Link>
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
