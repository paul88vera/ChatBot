import {Form, useActionData} from 'react-router';
import FormGroup from './FormGroup';
import { useOrganization, UserButton } from "@clerk/clerk-react";

const CreateForm = ({text}) => {
  const { organization } = useOrganization();
  const actionData = useActionData();
  const errors = actionData?.errors || {};
  const values = actionData?.values || {};

  const orgId = organization.id;

  return (
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
          {text}
        </button>
      </Form>
  )
}

export default CreateForm
