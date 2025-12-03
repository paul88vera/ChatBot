import { UserButton } from "@clerk/clerk-react";
import { Form, Link, redirect, useActionData } from "react-router";
import FormGroup from "../components/FormGroup";
import "../Dashboard.css";
import { createCompany } from "../api/company";
import { useOrganization } from "@clerk/clerk-react";
import React from "react";

const CreateSettings = () => {
  const { organization } = useOrganization();
  const actionData = useActionData();
  const errors = actionData?.errors || {};
  const values = actionData?.values || {};

  const orgId = organization.id;

  return (
    <div>
      <div className="settings-header">
        <UserButton className="clerk-user" />
        <h1>
          <Link to={`../`}>ChatBox</Link>
        </h1>
      </div>
      <Form
        method="post"
        className="settings-form"
        onSubmit={(e) => {
          const formData = new FormData(e.target);

          const name = formData.get("CompanyName");
          const desc = formData.get("CompanyDescription");
          const color = formData.get("CompanyColor");

          // Validation
          if (!name || !desc || !color) {
            e.preventDefault(); // <-- STOP THE SUBMIT
            alert("Fill all required fields!");
            return;
          }
        }}>
        <input type="hidden" name="ownerId" value={orgId} />

        <div className="settings-form-row-col">
          <FormGroup errorMessage={errors.companyName}>
            <label htmlFor="CompanyName">Company Name:</label>
            <input
              type="text"
              id="CompanyName"
              name="CompanyName"
              placeholder="(eg. Verafied Technologies)"
              defaultValue={values.companyName || ""}
              
            />
          </FormGroup>
          <FormGroup errorMessage={errors.companyEmail}>
            <label htmlFor="CompanyEmail">Company Email: </label>
            <input
              type="email"
              id="CompanyEmail"
              name="CompanyEmail"
              placeholder="(eg. support@verafied.tech)"
              defaultValue={values.companyEmail || ""}
              
            />
          </FormGroup>
          <FormGroup errorMessage={errors.companyWebsite}>
            <label htmlFor="CompanyWebsite">Website Title: </label>
            <input
              type="text"
              id="CompanyWebsite"
              name="CompanyWebsite"
              placeholder=" (eg. VERAfied.Tech)"
              defaultValue={values.companyWebsite || ""}
              
            />
          </FormGroup>
          <FormGroup errorMessage={errors.companyLink}>
            <label htmlFor="CompanyLink">Website Link:</label>
            <input
              type="text"
              id="CompanyLink"
              name="CompanyLink"
              placeholder="(eg. https://verafied.tech)"
              defaultValue={values.companyLink || ""}
              
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
              defaultValue={values.companyColor}
            />
          </FormGroup>
          <FormGroup errorMessage={errors.companyDirection}>
            <label htmlFor="CompanyDirection">ChatBox Direction: </label>
            <select
              id="CompanyDirection"
              name="CompanyDirection"
              defaultValue={values.companyDirection}>
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
            defaultValue={values.companyDescription || ""}></textarea>
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
            defaultValue={values.companyFaqs || ""}
            ></textarea>
        </FormGroup>

        <button type="submit">
          Save Settings
        </button>
      </Form>
    </div>
  );
};

function postFormValidator({
  companyName,
  companyEmail,
  companyDescription,
  companyFaqs,
}) {
  const errors = {};

  if (!companyName?.trim()) errors.companyName = "Required";
  if (!companyEmail?.trim()) errors.companyEmail = "Required";
  if (!companyDescription?.trim()) errors.companyDescription = "Required";
  if (!companyFaqs?.trim()) errors.companyFaqs = "Required";

  return errors;
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

  const errors = postFormValidator(companyData);

  if (Object.keys(errors).length > 0) {
    return { errors, values: companyData };
  }

  await createCompany(companyData);

  return redirect(`/dashboard`);
}

export const CreateSettingsPage = {
  action,
  element: <CreateSettings />,
};

export default React.memo(CreateSettings);
