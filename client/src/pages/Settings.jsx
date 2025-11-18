import { Link, useLoaderData } from "react-router";
import "../Settings.css";
import { getCompanyById } from "../api/company";

const Settings = () => {
  const company = useLoaderData();

  console.log(company.companyChatboxActive);
  return (
    <>
      <h1>Welcome to ChatBox</h1>

      <div className="settings-container">
        {!company.companyChatboxActive ? (
          <Link to={`/create`}>create your ChatBox</Link>
        ) : (
          <Link to={`/edit`}>edit your ChatBox</Link>
        )}
      </div>
    </>
  );
};

async function loader({ request: { signal }, params: { orgId } }) {
  const company = await getCompanyById(orgId, { signal });
  return company;
}

export const SettingsLoader = {
  loader,
  element: <Settings />,
};
