import { UserButton } from "@clerk/clerk-react";
import { Link, redirect } from "react-router";
import "../Dashboard.css";
import { createCompany } from "../api/company";
import { useOrganization } from "@clerk/clerk-react";
import React from "react";
import CreateForm from "../components/CreateForm";

const CreateSettings = () => {
  const { organization } = useOrganization();

  return (
    <div className="dash_form-container">
      <div className="settings-header">
        <UserButton className="clerk-user" />
        <h1>
          <Link to={`/dashboard/${organization.id}`}>ChatBox</Link>
        </h1>
      </div>
      <CreateForm text={'Create Settings'} />
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
    orgId: formData.get("orgId"),
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
