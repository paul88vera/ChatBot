import { useOrganization, UserButton } from "@clerk/clerk-react";
import { Form, Link, redirect, useLoaderData } from "react-router";
import FormGroup from "../components/FormGroup";
import "../Dashboard.css";
import { getCompanies, updateCompany } from "../api/company";
import { useState } from "react";
// import AvatarUploader from "../components/AvatarUploader";

const EditSettings = () => {
  const { company } = useLoaderData();
  const { organization } = useOrganization();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [websiteTitle, setWebsiteTitle] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [companyColor, setCompanyColor] = useState("");
  const [companyDirection, setCompanyDirection] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyFaqs, setCompanyFaqs] = useState("");
  const [agentName, setAgentName] = useState("");
  const [agentSubtitle, setAgentSubtitle] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandLink, setBrandLink] = useState("");

  // filter company by id
  const companyData = company.filter((comp) => comp.ownerId === organization.id);

  const errors = {}; // Placeholder for error messages
  return (
    <div>
      <div className="settings-header">
        <UserButton className="clerk-user" />
        <h1><Link to={`/${organization.id}/dashboard`}>
        ChatBox
        </Link>
        </h1>
      </div>
      <Form method="post" className="settings-form">
        <input type="hidden" name="companyId" value={companyData[0]?.id} />
        <input type="hidden" name="ownerId" value={companyData[0]?.ownerId} />
        <input type="hidden" name="publicId" value={companyData[0]?.publicId} />

        <div className="settings-form-row-col">
        <FormGroup errorMessage={errors.companyName}>
          <label htmlFor="CompanyName">Company Name:</label>
          <input
            type="text"
            id="CompanyName"
            name="CompanyName"
            placeholder="(eg. Verafied Technologies)"
            defaultValue={companyData[0]?.companyName}
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
              defaultValue={companyData[0]?.companyEmail}
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
              defaultValue={companyData[0]?.companyWebsite}
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
              defaultValue={companyData[0]?.companyLink}
              onChange={(e) => {
                setWebsiteLink(e.target.value);
              }}
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
              defaultValue={companyData[0]?.companyColor}
              onChange={(e) => {
                setCompanyColor(e.target.value);
              }}
              />
        </FormGroup>
        <FormGroup errorMessage={errors.companyDirection}>
          <label htmlFor="CompanyDirection">
            ChatBox Direction:{" "}
          </label>
            <select
              id="CompanyDirection"
              name="CompanyDirection"
              defaultValue={companyData[0]?.companyDirection}
              onChange={(e) => {
                setCompanyDirection(e.target.value);
              }}>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
        </FormGroup>
         
        </div>
        <div>
          <FormGroup errorMessage={errors.agentName}>
            <label htmlFor="AgentName">Agent Name: </label>
            <input
              type="text"
              id="AgentName"
              name="AgentName"
              placeholder=" (eg. Tron, Jeeves, etc.)"
              defaultValue={companyData[0]?.agentName || ""}
              onChange={(e) => {
                setAgentName(e.target.value);
              }} />
            </FormGroup>
            <FormGroup errorMessage={errors.agentSubtitle}>
            <label htmlFor="AgentSubtitle">Agent Subtitle: </label>
            <input
              type="text"
              id="AgentSubtitle"
              name="AgentSubtitle"
              placeholder=" (eg. Your AI assistant for IT and SaaS services.)"
              defaultValue={companyData[0]?.agentSubtitle || ""}
              onChange={(e) => {
                setAgentSubtitle(e.target.value);
              }} />
              </FormGroup>
              <FormGroup errorMessage={errors.welcomeMessage}>
            <label htmlFor="WelcomeMessage">Welcome Message: </label>
            <input
              type="text"
              id="WelcomeMessage"
              name="WelcomeMessage"
              placeholder=" (eg. Hi there! How can I assist you today?)"
              defaultValue={companyData[0]?.welcomeMessage || ""}
              onChange={(e) => {
                setWelcomeMessage(e.target.value);
              }} />
              </FormGroup> 
        </div>
        <div className="settings-form-row">
          <FormGroup errorMessage={errors.brandName}>
            <label htmlFor="BrandName">Brand Name: </label>
            <input
              type="text"
              id="BrandName"
              name="BrandName"
              placeholder=" (eg. VERAfied Tech)"
              defaultValue={companyData[0]?.brandName || ""}
              onChange={(e) => {
                setBrandName(e.target.value);
              }} />
            </FormGroup> 
          <FormGroup errorMessage={errors.brandLink}>
            <label htmlFor="BrandLink">Brand Link: </label>
            <input
              type="text"
              id="BrandLink"
              name="BrandLink"
              placeholder=" (eg. https://chatbox.verafied.tech)"
              defaultValue={companyData[0]?.brandLink || ""}
              onChange={(e) => {
                setBrandLink(e.target.value);
              }} /> 
              </FormGroup>
              {/* TODO: Need to file image uploader */}
              {/* <FormGroup>
                <AvatarUploader company={companyData[0]} />
              </FormGroup> */}
        </div>
        <FormGroup errorMessage={errors.companyDescription}>
          <label htmlFor="CompanyDescription">Company Description: </label>
          <textarea
            id="CompanyDescription"
            name="CompanyDescription"
            placeholder="(Be as descriptive as you can here with as much company information for services.)"
            
            defaultValue={companyData[0]?.companyDescription}
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
            
            defaultValue={companyData[0]?.companyFaqs}
            onChange={(e) => {
              setCompanyFaqs(e.target.value);
            }}></textarea>
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
    publicId: formData.get("publicId"),
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

  await updateCompany(companyData.id, companyData);

  return redirect(`/${companyData.ownerId}/dashboard`);
}

export const EditSettingsPage = {
  action,
  loader,
  element: <EditSettings />,
};
