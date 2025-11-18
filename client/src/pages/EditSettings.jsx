import { UserButton, useOrganization } from "@clerk/clerk-react";
import { Form, Link, useLoaderData } from "react-router";
import FormGroup from "../components/FormGroup";
import "../Settings.css";
import { getCompanies } from "../api/company";

const EditSettings = () => {
  const { company } = useLoaderData();

  // const filteredCompanies = getCompanies().filter(
  //   (comp) => comp.ownerId === company.ownerId
  // );

  // if (!filteredCompanies.length) {
  //   return <div>Loading...</div>;
  // }

  const errors = {}; // Placeholder for error messages
  return (
    <div>
      <div className="settings-header">
        <div>
          <UserButton className="clerk-user" />
          <h1>ChatBox</h1>
        </div>
        <div>
          <Link
            to={`/${useOrganization().organization.id}/settings/create/${
              company.id
            }`}>
            New ChatBox
          </Link>
          <Link
            to={`/${useOrganization().organization.id}/settings/edit/${
              company.id
            }`}>
            Edit ChatBox
          </Link>
        </div>
      </div>
      <Form method="post" className="settings-form">
        <input type="hidden" name="ownerId" value={company.ownerId} />
        <FormGroup errorMessage={errors.companyName}>
          <label htmlFor="CompanyName">Company Name:</label>
          <input
            type="text"
            id="CompanyName"
            name="CompanyName"
            placeholder="(eg. Verafied Technologies)"
            defaultValue={company.companyName}
          />
        </FormGroup>
        <FormGroup errorMessage={errors.companyEmail}>
          <label htmlFor="CompanyEmail">Company Email: </label>
          <input
            type="email"
            id="CompanyEmail"
            name="CompanyEmail"
            placeholder="(eg. support@verafied.tech)"
            defaultValue={company.companyEmail}
          />
        </FormGroup>
        <FormGroup errorMessage={errors.companyWebsite}>
          <label htmlFor="CompanyWebsite">Website Title: </label>
          <input
            type="text"
            id="CompanyWebsite"
            name="CompanyWebsite"
            placeholder=" (eg. VERAfied.Tech)"
            defaultValue={company.companyWebsite}
          />
        </FormGroup>
        <FormGroup errorMessage={errors.companyLink}>
          <label htmlFor="CompanyLink">Website Link:</label>
          <input
            type="text"
            id="CompanyLink"
            name="CompanyLink"
            placeholder="(eg. https://verafied.tech)"
            defaultValue={company.companyLink}
          />
        </FormGroup>
        <FormGroup errorMessage={errors.companyDescription}>
          <label htmlFor="CompanyDescription">Company Description: </label>
          <textarea
            id="CompanyDescription"
            name="CompanyDescription"
            placeholder="(Be as descriptive as you can here with as much company information for services.)"
            defaultValue={company.companyDescription}></textarea>
        </FormGroup>
        <FormGroup errorMessage={errors.companyFaqs}>
          <label htmlFor="CompanyFaqs">
            Company FAQs (up to 10 FAQs - comma separated):{" "}
          </label>
          <input
            type="text"
            id="CompanyFaqs"
            name="CompanyFaqs"
            placeholder="(eg. We are the #1 IT service provider in San Antonio, etc.)"
            defaultValue={company.companyFaqs}
          />
        </FormGroup>
        <FormGroup errorMessage={errors.companyColor}>
          <label htmlFor="CompanyColor">
            Brand Color:{" "}
            <input
              type="color"
              id="CompanyColor"
              name="CompanyColor"
              defaultValue={company.companyColor}
            />
          </label>
        </FormGroup>
        <FormGroup errorMessage={errors.companyDirection}>
          <label htmlFor="CompanyDirection">
            ChatBox Direction:{" "}
            <select
              id="CompanyDirection"
              name="CompanyDirection"
              defaultValue={company.companyDirection}>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </label>
        </FormGroup>
        <button type="submit">Save Settings</button>
      </Form>
    </div>
  );
};

async function loader({ request: { signal } }) {
  const company = await getCompanies({ signal });
  return { company };
}

export const EditSettingPage = {
  loader,
  element: <EditSettings />,
};
