import { getPermissions } from "../helpers/permissions.js";

router.get("/company/:orgId", async (req, res) => {
  const company = await getCompany(req.params.orgId);

  const permissions = getPermissions(company.subscriptionPlan);

  res.json({
    company,
    permissions,
  });
});