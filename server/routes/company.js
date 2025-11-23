const express = require("express");
const router = express.Router();
const { getAuth } = require("@clerk/express");

const db = require("../db/connections.js");

router.get("/", async (req, res) => {
  try {
    const connection = await db();
    const query = "SELECT * FROM companies";
    const [rows] = await connection.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const connection = await db();
    const companyId = req.params.id;
    // const company = req.body;

    // const ownerId = company.ownerId;

    // if (!ownerId) {
    //   return res.status(500).json({ error: "Company orgId missing" });
    // }

    const [rows] = await connection.query(
      "SELECT * FROM companies WHERE id = ?",
      [companyId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch company" });
  }
});

router.post("/", async (req, res) => {
  try {
    const connection = await db();
    const {
      ownerId,
      companyName,
      companyEmail,
      companyWebsite,
      companyLink,
      companyDescription,
      companyFaqs,
      companyColor,
      companyDirection,
      companyChatboxActive,
    } = req.body;

    const orgId = ownerId;

    if (!orgId) {
      return res.status(400).json({ error: "Organization Id is required" });
    }

    const [result] = await connection.query(
      "INSERT INTO companies (ownerId, companyName, companyEmail, companyWebsite, companyLink, companyDescription, companyFaqs, companyColor, companyDirection, companyChatboxActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        orgId,
        companyName,
        companyEmail,
        companyWebsite,
        companyLink,
        companyDescription,
        JSON.stringify(companyFaqs),
        companyColor,
        companyDirection,
        companyChatboxActive,
      ]
    );
    res.status(201).json({
      id: result.insertId,
      ownerId,
      companyName,
      companyEmail,
      companyWebsite,
      companyLink,
      companyDescription,
      companyFaqs,
      companyColor,
      companyDirection,
      companyChatboxActive,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create company" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const connection = await db();
    const companyId = req.params.id;
    const updateData = { ...req.body };
    if (updateData.companyFaqs) {
      updateData.companyFaqs = JSON.stringify(updateData.companyFaqs);
    }

    const ownerId = updateData.ownerId;

    if (!ownerId) {
      return res.status(500).json({ error: "Company orgId missing" });
    }

    const [result] = await connection.query(
      "UPDATE companies SET ? WHERE id = ?",
      [updateData, companyId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json({ id: companyId, ...updateData });
  } catch (error) {
    res.status(500).json({ error: "Failed to update company" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const connection = await db();
    const companyId = req.params.id;
    const [result] = await connection.query(
      "DELETE FROM companies WHERE id = ?",
      [companyId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete company" });
  }
});

module.exports = router;
