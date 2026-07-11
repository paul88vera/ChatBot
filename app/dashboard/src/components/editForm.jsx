import { Form } from "react-router";
import FormGroup from './FormGroup';
import { useState } from "react";

const EditForm = ({companyData, text, errors}) => {
  const [id] = useState(companyData[0].id);
  const [ownerId] = useState(companyData[0].ownerId);
  const [publicId] = useState(companyData[0].publicId);
  const [name, setName] = useState(companyData[0].companyName || "");
  const [email, setEmail] = useState(companyData[0].companyEmail || "");
  const [websiteTitle, setWebsiteTitle] = useState(companyData[0].websiteTitle || "");
  const [websiteLink, setWebsiteLink] = useState(companyData[0].websiteLink || "");
  const [companyColor, setCompanyColor] = useState(companyData[0].companyColor || "");
  const [companyDirection, setCompanyDirection] = useState(companyData[0].companyDirection || "");
  const [companyDescription, setCompanyDescription] = useState(companyData[0].companyDescription || "");
  const [companyFaqs, setCompanyFaqs] = useState(companyData[0].companyFaqs || "");
  const [agentName, setAgentName] = useState(companyData[0].agentName || "");
  const [agentSubtitle, setAgentSubtitle] = useState(companyData[0].agentSubtitle || "");
  const [welcomeMessage, setWelcomeMessage] = useState(companyData[0].welcomeMessage || "");
  const [brandName, setBrandName] = useState(companyData[0].brandName || "");
  const [brandLink, setBrandLink] = useState(companyData[0].brandLink || "");

  return (
    <Form method="post" className="settings-form">
        <input type="hidden" name="companyId" value={id} />
        <input type="hidden" name="ownerId" value={ownerId} />
        <input type="hidden" name="publicId" value={publicId} />

        <div className="settings-form-row-col row-cols">
          <FormGroup errorMessage={errors.companyName}>
            <label htmlFor="CompanyName">Company Name:</label>
            <input
              type="text"
              id="CompanyName"
              name="CompanyName"
              placeholder="(eg. Verafied Technologies)"
              defaultValue={name}
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
              defaultValue={email}
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
              defaultValue={websiteTitle}
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
              defaultValue={websiteLink}
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
              defaultValue={companyColor}
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
              defaultValue={companyDirection}
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
              defaultValue={agentName || ""}
              onChange={(e) => {
                setAgentName(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup errorMessage={errors.agentSubtitle}>
            <label htmlFor="AgentSubtitle">Agent Subtitle: </label>
            <input
              type="text"
              id="AgentSubtitle"
              name="AgentSubtitle"
              placeholder=" (eg. Your AI assistant for IT and SaaS services.)"
              defaultValue={agentSubtitle || ""}
              onChange={(e) => {
                setAgentSubtitle(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup errorMessage={errors.welcomeMessage}>
            <label htmlFor="WelcomeMessage">Welcome Message: </label>
            <input
              type="text"
              id="WelcomeMessage"
              name="WelcomeMessage"
              placeholder=" (eg. Hi there! How can I assist you today?)"
              defaultValue={welcomeMessage || ""}
              onChange={(e) => {
                setWelcomeMessage(e.target.value);
              }}
            />
          </FormGroup>
        </div>
        <div className="settings-form-row-col">
          <FormGroup errorMessage={errors.brandName}>
            <label htmlFor="BrandName">Brand Name: </label>
            <input
              type="text"
              id="BrandName"
              name="BrandName"
              placeholder=" (eg. VERAfied Tech)"
              defaultValue={brandName || ""}
              onChange={(e) => {
                setBrandName(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup errorMessage={errors.brandLink}>
            <label htmlFor="BrandLink">Brand Link: </label>
            <input
              type="text"
              id="BrandLink"
              name="BrandLink"
              placeholder=" (eg. https://chatbox.verafied.tech)"
              defaultValue={brandLink || ""}
              onChange={(e) => {
                setBrandLink(e.target.value);
              }}
            />
          </FormGroup>
          {/* TODO: Need to file image uploader */}
          {/* <FormGroup>
                <AvatarUploader company={companyData} />
              </FormGroup> */}
        </div>
        <FormGroup errorMessage={errors.companyDescription}>
          <label htmlFor="CompanyDescription">Company Description: </label>
          <textarea
            id="CompanyDescription"
            name="CompanyDescription"
            placeholder="(Be as descriptive as you can here with as much company information for services.)"
            defaultValue={companyDescription}
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
            defaultValue={companyFaqs}
            onChange={(e) => {
              setCompanyFaqs(e.target.value);
            }}></textarea>
        </FormGroup>

        <button type="submit">{text}</button>
      </Form>
  )
}

export default EditForm
