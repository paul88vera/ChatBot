import { UserButton } from "@clerk/clerk-react";
import { Form } from "react-router";
import FormGroup from "../components/FormGroup";
import "../Settings.css";

const company = {
  ownerId: "org_test_1234567890" || process.env.VITE_TEMP_ORGID,
  companyName: "Verafied Tech",
  companyEmail: "support@verafied.tech",
  companyWebsite: "VERAfied.Tech", // what shows on copyright section
  companyLink: "https://verafied.tech",
  companyDescription: "Affordable IT and SaaS services.",
  companyFaqs: [
    "What services do you offer?",
    "Do you have monthly pricing?",
    "What technologies do you use?",
  ],
  companyColor: "#ac29c3ff",
  companyDirection: "left", // left or right
};

function Settings() {
  const errors = {}; // Placeholder for error messages
  return (
    <div>
      <div className="settings-header">
        <UserButton className="clerk-user" />
        <h1>ChatBox</h1>
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
          />
        </FormGroup>
        <FormGroup errorMessage={errors.companyEmail}>
          <label htmlFor="CompanyEmail">Company Email: </label>
          <input
            type="email"
            id="CompanyEmail"
            name="CompanyEmail"
            placeholder="(eg. support@verafied.tech)"
          />
        </FormGroup>
        <FormGroup errorMessage={errors.companyWebsite}>
          <label htmlFor="CompanyWebsite">Website Title: </label>
          <input
            type="text"
            id="CompanyWebsite"
            name="CompanyWebsite"
            placeholder=" (eg. VERAfied.Tech)"
          />
        </FormGroup>
        <FormGroup errorMessage={errors.companyLink}>
          <label htmlFor="CompanyLink">Website Link:</label>
          <input
            type="text"
            id="CompanyLink"
            name="CompanyLink"
            placeholder="(eg. https://verafied.tech)"
          />
        </FormGroup>
        <FormGroup errorMessage={errors.companyDescription}>
          <label htmlFor="CompanyDescription">Company Description: </label>
          <textarea
            id="CompanyDescription"
            name="CompanyDescription"
            placeholder="(Be as descriptive as you can here with as much company information for services.)"></textarea>
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
          />
        </FormGroup>
        <FormGroup errorMessage={errors.companyColor}>
          <label htmlFor="CompanyColor">
            Brand Color:{" "}
            <input type="color" id="CompanyColor" name="CompanyColor" />
          </label>
        </FormGroup>
        <FormGroup errorMessage={errors.companyDirection}>
          <label htmlFor="CompanyDirection">
            ChatBox Direction:{" "}
            <select id="CompanyDirection" name="CompanyDirection">
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </label>
        </FormGroup>
        <button type="submit">Save Settings</button>
      </Form>
    </div>
  );
}

export default Settings;
