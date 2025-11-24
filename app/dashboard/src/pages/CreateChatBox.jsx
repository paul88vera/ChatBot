import { UserButton } from "@clerk/clerk-react";
import { Form, Link, redirect } from "react-router";
import FormGroup from "../components/FormGroup";
import "../Dashboard.css";
import { createCompany } from "../api/company";
import { useOrganization } from "@clerk/clerk-react";
import React, { useState } from "react";

const CreateSettings = () => {
  const { organization } = useOrganization();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [websiteTitle, setWebsiteTitle] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [companyColor, setCompanyColor] = useState("");
  const [companyDirection, setCompanyDirection] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyFaqs, setCompanyFaqs] = useState("");

  const orgId = organization.id;

  const errors = {}; // Placeholder for error messages
  const companyData = {};
  return (
    <div>
      <div className="settings-header">
        <UserButton className="clerk-user" />
        <h1>
          <Link to={`../`}>ChatBox</Link>
        </h1>
      </div>
      <Form method="post" className="settings-form">
        <input type="hidden" name="ownerId" value={orgId} />

        <div className="settings-form-row-col">
          <FormGroup errorMessage={errors.companyName}>
            <label htmlFor="CompanyName">Company Name:</label>
            <input
              type="text"
              id="CompanyName"
              name="CompanyName"
              placeholder="(eg. Verafied Technologies)"
              value={name}
              defaultValue={companyData.companyName}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup errorMessage={errors.companyEmail}>
            <label htmlFor="CompanyEmail">Company Email: </label>
            <input
              type="email"
              id="CompanyEmail"
              name="CompanyEmail"
              placeholder="(eg. support@verafied.tech)"
              value={email}
              defaultValue={companyData.companyEmail}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup errorMessage={errors.companyWebsite}>
            <label htmlFor="CompanyWebsite">Website Title: </label>
            <input
              type="text"
              id="CompanyWebsite"
              name="CompanyWebsite"
              placeholder=" (eg. VERAfied.Tech)"
              value={websiteTitle}
              defaultValue={companyData.companyWebsite}
              onChange={(e) => {
                setWebsiteTitle(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup errorMessage={errors.companyLink}>
            <label htmlFor="CompanyLink">Website Link:</label>
            <input
              type="text"
              id="CompanyLink"
              name="CompanyLink"
              placeholder="(eg. https://verafied.tech)"
              value={websiteLink}
              defaultValue={companyData.companyLink}
              onChange={(e) => {
                setWebsiteLink(e.target.value);
              }}
            />
          </FormGroup>
        </div>
        <div className="settings-form-row">
          <FormGroup errorMessage={errors.companyColor}>
            <label htmlFor="CompanyColor">Brand Color: </label>
            <input
              type="color"
              id="CompanyColor"
              name="CompanyColor"
              value={companyColor}
              defaultValue={companyData.companyColor}
              onChange={(e) => {
                setCompanyColor(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup errorMessage={errors.companyDirection}>
            <label htmlFor="CompanyDirection">ChatBox Direction: </label>
            <select
              id="CompanyDirection"
              name="CompanyDirection"
              value={companyDirection}
              defaultValue={companyData.companyDirection}
              onChange={(e) => {
                setCompanyDirection(e.target.value);
              }}>
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
            value={companyDescription}
            defaultValue={companyData.companyDescription}
            onChange={(e) => {
              setCompanyDescription(e.target.value);
            }}></textarea>
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
            value={companyFaqs}
            defaultValue={companyData.companyFaqs}
            onChange={(e) => {
              setCompanyFaqs(e.target.value);
            }}></textarea>
        </FormGroup>

        <button type="submit">Save Settings</button>
      </Form>
    </div>
  );
};

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

  await createCompany(companyData);

  return redirect(`/${companyData.ownerId}/dashboard`);
}

export const CreateSettingsPage = {
  action,
  element: <CreateSettings />,
};

export default React.memo(CreateSettings);