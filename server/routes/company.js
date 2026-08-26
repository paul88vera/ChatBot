import express from "express";
const router = express.Router();
import crypto from "crypto";

import db from "../db/connections.js";

import { getPermissions } from "../helpers/permissions.js";

// Subscription Permissions Check TODO:
// router.get("/:orgId", async (req, res) => {
//   try {
//     const connection = await db();
//     const companyId = req.params.id;

//     // get company from publicId
//     const [rows] = await connection.query(
//       "SELECT * FROM companies WHERE publicId = ?",
//       [companyId],
//     );
//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Company not found" });
//     }

//     // get company subscription plan from
//     const [company] = await connection.query(
//       "SELECT subscriptionPlan FROM companies WHERE orgId = ?",
//       [companyId],
//     );

//     if (!company.subscriptionPlan) {
//       return res.status(403).json({
//         message: "Active subscription required.",
//       });
//     }

//     const [results] = connection.query(company);
//     const permissions = getPermissions(company.FEATURES);

//     res.json({
//       company,
//       permissions,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });

// Get All companies - Private
router.get("/", async (req, res) => {
  try {
    const connection = await db();
    const query = "SELECT * FROM chatbot_db.companies";
    const [rows] = await connection.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
});

// Get single company by orgId - Private
router.get("/:orgId", async (req, res) => {
  try {
    const connection = await db();
    const orgId = req.params.orgId;

    const [rows] = await connection.query(
      "SELECT * FROM chatbot_db.companies WHERE orgId = ?",
      [orgId],
    );

    
    if (rows.length === 0) {
      return res.status(404).json({ error: "Company not found" });
    }
    
    if (!rows[0].subscriptionPlan) {
      // No paid subscription
      return res.status(403).json({
        message: "Active subscription required.",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch company" });
  }
});

// Create company
router.post("/", async (req, res) => {
  try {
    const connection = await db();

    let {
      orgId,
      companyName,
      companyEmail,
      companyWebsite,
      companyLink,
      companyDescription,
      agentName,
      agentSubtitle,
      brandName,
      brandLink,
      welcomeMessage,
      companyFaqs,
      companyColor,
      companyDirection,
      companyChatboxActive,
    } = req.body;

    if (!orgId) {
      return res.status(400).json({ error: "Organization Id is required" });
    }

    // Normalize companyChatboxActive: default to true (1)
    companyChatboxActive =
      companyChatboxActive === undefined ? 1 : companyChatboxActive ? 1 : 0;

    // Generate public ID
    const publicId = "cmp_" + crypto.randomBytes(4).toString("hex");

    const [result] = await connection.query(
      `INSERT INTO chatbot_db.companies 
      (orgId, publicId, companyName, companyEmail, companyWebsite, companyLink, companyDescription, agentName, agentSubtitle, brandName, brandLink, welcomeMessage, companyFaqs, companyColor, companyDirection, companyChatboxActive)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
      [
        orgId,
        publicId,
        companyName,
        companyEmail,
        companyWebsite,
        companyLink,
        companyDescription,
        agentName,
        agentSubtitle,
        brandName,
        brandLink,
        welcomeMessage,
        JSON.stringify(companyFaqs),
        companyColor,
        companyDirection,
        companyChatboxActive,
      ],
    );

    res.status(201).json({
      id: result.insertId,
      publicId,
      orgId,
      companyName,
      companyEmail,
      companyWebsite,
      companyLink,
      companyDescription,
      agentName,
      agentSubtitle,
      brandName,
      brandLink,
      welcomeMessage,
      companyFaqs,
      companyColor,
      companyDirection,
      companyChatboxActive: Boolean(companyChatboxActive),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create company" });
  }
});

// Update companny
router.put("/:orgId", async (req, res) => {
  try {
    const connection = await db();
    const orgId = req.params.orgId;
    const updateData = { ...req.body };

    if (updateData.companyFaqs) {
      updateData.companyFaqs = JSON.stringify(updateData.companyFaqs);
    }

    // Normalize companyChatboxActive if present
    if (updateData.companyChatboxActive !== undefined) {
      updateData.companyChatboxActive = updateData.companyChatboxActive ? 1 : 0;
    }

    const updatedOrgId = updateData.orgId;

    if (!orgId) {
      return res.status(400).json({ error: "Company orgId missing" });
    }

    const [result] = await connection.query(
      "UPDATE chatbot_db.companies SET ? WHERE orgId = ?",
      [updateData, updatedOrgId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Return boolean for frontend
    if (updateData.companyChatboxActive !== undefined) {
      updateData.companyChatboxActive = Boolean(
        updateData.companyChatboxActive,
      );
    }

    res.json({ orgId: orgId, ...updateData });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update company" });
  }
});

// Delete company
router.delete("/:orgId", async (req, res) => {
  try {
    const connection = await db();
    const orgId = req.params.orgId;
    const [result] = await connection.query(
      "DELETE FROM chatbot_db.companies WHERE orgId = ?",
      [orgId],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete company" });
  }
});

export default router;
