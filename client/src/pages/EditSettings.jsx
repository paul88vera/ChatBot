import { UserButton } from "@clerk/clerk-react";
import { Form, redirect, useLoaderData } from "react-router";
import FormGroup from "../components/FormGroup";
import "../Settings.css";
import { getCompanies, updateCompany } from "../api/company";
import ChatBox from "../components/ChatBox";

const EditSettings = () => {
  const { company } = useLoaderData();

  // filter company by id
  const companyFiltered = company.filter((comp) => comp.id === company[0].id);
  const companyData = companyFiltered.length
    ? companyFiltered[0]
    : {
        companyId: "",
        ownerId: "",
        companyName: "",
        companyEmail: "",
        companyWebsite: "",
        companyLink: "",
        companyDescription: "",
        companyFaqs: "",
        companyColor: "#000000",
        companyDirection: "left",
      };

  const errors = {}; // Placeholder for error messages
  return (
    <div>
      <ChatBox company={companyData} />
      <div className="settings-header">
        <UserButton className="clerk-user" />
        <h1>ChatBox</h1>
      </div>
      <Form method="post" className="settings-form">
        <input type="hidden" name="companyId" value={companyData.id} />
        <input type="hidden" name="ownerId" value={companyData.ownerId} />

        <div className="settings-form-row-col">
        <FormGroup errorMessage={errors.companyName}>
          <label htmlFor="CompanyName">Company Name:</label>
          <input
            type="text"
            id="CompanyName"
            name="CompanyName"
            placeholder="(eg. Verafied Technologies)"
            defaultValue={companyData.companyName}
            />
        </FormGroup>
        <FormGroup errorMessage={errors.companyEmail}>
          <label htmlFor="CompanyEmail">Company Email: </label>
          <input
            type="email"
            id="CompanyEmail"
            name="CompanyEmail"
            placeholder="(eg. support@verafied.tech)"
            defaultValue={companyData.companyEmail}
            />
        </FormGroup>
        <FormGroup errorMessage={errors.companyWebsite}>
          <label htmlFor="CompanyWebsite">Website Title: </label>
          <input
            type="text"
            id="CompanyWebsite"
            name="CompanyWebsite"
            placeholder=" (eg. VERAfied.Tech)"
            defaultValue={companyData.companyWebsite}
            />
        </FormGroup>
        <FormGroup errorMessage={errors.companyLink}>
          <label htmlFor="CompanyLink">Website Link:</label>
          <input
            type="text"
            id="CompanyLink"
            name="CompanyLink"
            placeholder="(eg. https://verafied.tech)"
            defaultValue={companyData.companyLink}
            />
        </FormGroup>
            </div>
          <div className="settings-form-row">
        <FormGroup errorMessage={errors.companyColor}>
          <label htmlFor="CompanyColor">
            Brand Color:{" "}
          </label>
            <input
              type="color"
              id="CompanyColor"
              name="CompanyColor"
              defaultValue={companyData.companyColor}
              />
        </FormGroup>
        <FormGroup errorMessage={errors.companyDirection}>
          <label htmlFor="CompanyDirection">
            ChatBox Direction:{" "}
          </label>
            <select
              id="CompanyDirection"
              name="CompanyDirection"
              defaultValue={companyData.companyDirection}>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
        </FormGroup>
        </div>
        <FormGroup errorMessage={errors.companyDescription}>
          <label htmlFor="CompanyDescription">Company Description: </label>
          <textarea
            id="CompanyDescription"
            name="CompanyDescription"
            placeholder="(Be as descriptive as you can here with as much company information for services.)"
            defaultValue={companyData.companyDescription}></textarea>
        </FormGroup>
        <FormGroup errorMessage={errors.companyFaqs}>
          <label htmlFor="CompanyFaqs">
            Company FAQs (up to 10 FAQs - comma separated):{" "}
          </label>
          <textarea
            type="text"
            id="CompanyFaqs"
            name="CompanyFaqs"
            placeholder="(eg. We are the #1 IT service provider in San Antonio, etc.)"
            defaultValue={companyData.companyFaqs}></textarea>
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

async function action({ request }) {
  const formData = await request.formData();
  const companyData = {
    id: formData.get("companyId"),
    ownerId: formData.get("ownerId"),
    companyName: formData.get("CompanyName"),
    companyEmail: formData.get("CompanyEmail"),
    companyWebsite: formData.get("CompanyWebsite"),
    companyLink: formData.get("CompanyLink"),
    companyDescription: formData.get("CompanyDescription"),
    companyFaqs: formData.get("CompanyFaqs"),
    companyColor: formData.get("CompanyColor"),
    companyDirection: formData.get("CompanyDirection"),
  };

  await updateCompany(companyData.id, companyData);

  return redirect(`/${companyData.ownerId}/settings`);
}

export const EditSettingsPage = {
  action,
  loader,
  element: <EditSettings />,
};
