import { useOrganization, UserButton } from "@clerk/clerk-react";
import { Form, Link, redirect, useLoaderData } from "react-router";
import "../Dashboard.css";
import { getCompanies, updateCompany } from "../api/company";
import { useState } from "react";
import EditForm from "../components/editForm";
// import AvatarUploader from "../components/AvatarUploader";

const EditSettings = () => {
  const { company } = useLoaderData();
  const { organization } = useOrganization();

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [websiteTitle, setWebsiteTitle] = useState("");
  // const [websiteLink, setWebsiteLink] = useState("");
  // const [companyColor, setCompanyColor] = useState("");
  // const [companyDirection, setCompanyDirection] = useState("");
  // const [companyDescription, setCompanyDescription] = useState("");
  // const [companyFaqs, setCompanyFaqs] = useState("");
  // const [agentName, setAgentName] = useState("");
  // const [agentSubtitle, setAgentSubtitle] = useState("");
  // const [welcomeMessage, setWelcomeMessage] = useState("");
  // const [brandName, setBrandName] = useState("");
  // const [brandLink, setBrandLink] = useState("");


  // filter company by id
  const companyData = company.filter(
    (comp) => comp.orgId === organization.id,
  );

  const errors = {}; // Placeholder for error messages
  return (
    <div className="dash_form-container">
      <div className="settings-header">
        <UserButton className="clerk-user" />
        <h1>
          <Link to={`/dashboard/${organization.id}`}>ChatBox</Link>
        </h1>
      </div>
      <EditForm errors={errors} companyData={companyData} text={'Save settings'} />
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
    orgId: formData.get("orgId"),
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

  return redirect(`/dashboard/${companyData.orgId}`);
}

export const EditSettingsPage = {
  action,
  loader,
  element: <EditSettings />,
};
