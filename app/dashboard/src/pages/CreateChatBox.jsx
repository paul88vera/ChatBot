import { UserButton } from "@clerk/clerk-react";
import { Form, Link, redirect, useActionData } from "react-router";
import FormGroup from "../components/FormGroup";
import "../Dashboard.css";
import { createCompany } from "../api/company";
import { useOrganization } from "@clerk/clerk-react";
import React from "react";
// import AvatarUploader from "../components/AvatarUploader";

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
              defaultValue={values.companyColor || "#000000"}
            />
          </FormGroup>
          <FormGroup errorMessage={errors.companyDirection}>
            <label htmlFor="CompanyDirection">ChatBox Direction: </label>
            <select
              id="CompanyDirection"
              name="CompanyDirection"
              defaultValue={values.companyDirection || "right"}>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </FormGroup>

          <FormGroup errorMessage={errors.agentName}>
            <label htmlFor="AgentName">Agent Name: </label>
            <input
              type="text"
              id="AgentName"
              name="AgentName"
              placeholder=" (eg. VERAfied.Tech)"
              defaultValue={values.agentName || "Tron"}
              
            />
            </FormGroup>

            <FormGroup errorMessage={errors.agentSubtitle}>
            <label htmlFor="AgentSubtitle">Agent Subtitle: </label>
            <input
              type="text"
              id="AgentSubtitle"
              name="AgentSubtitle"
              placeholder=" (eg. Your AI assistant for IT and SaaS services.)"
              defaultValue={values.agentSubtitle || "AI Agent for IT and SaaS services."}
              
            />
            </FormGroup>
            <FormGroup errorMessage={errors.welcomeMessage}>
            <label htmlFor="WelcomeMessage">Welcome Message: </label>
            <input
              type="text"
              id="WelcomeMessage"
              name="WelcomeMessage"
              placeholder=" (eg. Hello! How can I assist you today?)"
              defaultValue={values.welcomeMessage || "Hello! How can I assist you today?"}
              
            />
            </FormGroup>
        </div>
        <div>
          <FormGroup errorMessage={errors.brandName}>
            <label htmlFor="BrandName">Brand Name: </label>
            <input
              type="text"
              id="BrandName"
              name="BrandName"
              placeholder=" (eg. VERAfied Tech)"
              defaultValue={values.brandName || "VERAfied.Tech"}
              
            />
            </FormGroup>
            <FormGroup errorMessage={errors.brandLink}>
            <label htmlFor="BrandLink">Brand Link: </label>
            <input
              type="text"
              id="BrandLink"
              name="BrandLink"
              placeholder=" (eg. https://chatbox.verafied.tech)"
              defaultValue={values.brandLink || "https://chatbox.verafied.tech"}
              
            />
            </FormGroup>
          {/* TODO: Need to fix the image uploader */}
            {/* <FormGroup>
              
                <AvatarUploader company={values.companyData} />
              
            </FormGroup> */}
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
  brandName,
  brandLink,
  agentName,
  agentSubtitle,
  welcomeMessage
}) {
  const errors = {};

  if (!companyName?.trim()) errors.companyName = "Required";
  if (!companyEmail?.trim()) errors.companyEmail = "Required";
  if (!companyDescription?.trim()) errors.companyDescription = "Required";
  if (!companyFaqs?.trim()) errors.companyFaqs = "Required";
  if (!brandName?.trim()) errors.brandName = "Required";
  if (!brandLink?.trim()) errors.brandLink = "Required";
  if (!agentName?.trim()) errors.agentName = "Required";
  if (!agentSubtitle?.trim()) errors.agentSubtitle = "Required";
  if (!welcomeMessage?.trim()) errors.welcomeMessage = "Required";

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
    agentName: formData.get("AgentName"),
    agentSubtitle: formData.get("AgentSubtitle"),
    brandName: formData.get("BrandName"),
    brandLink: formData.get("BrandLink"),
    welcomeMessage: formData.get("WelcomeMessage"),
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
