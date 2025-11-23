import { redirect } from "react-router";
import { baseApi } from "./base";

export function getCompanies() {
  return baseApi.get("/company").then((res) => res.data);
}

export function createCompany(companyData) {
  return baseApi.post("/company", companyData).then((res) => res.data);
}

export function updateCompany(id, companyData) {
  return baseApi.put(`/company/${id}`, companyData).then((res) => res.data);
}

export function deleteCompany(id) {
  return baseApi
    .delete(`/company/${id}`)
    .then((res) => res.data)
    .finally(() => {
      redirect("/");
      console.log(`Company with id ${id} deleted`);
    });
}
