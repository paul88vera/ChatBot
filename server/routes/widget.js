import express from "express";
import db from "../db/connections.js";

const router = express.Router();

router.get("/:publicId", async (req, res) => {
  try {
    const publicId = req.params.publicId;

    const [rows] = await db.query(
      "SELECT * FROM chatbot_db.companies WHERE publicId = ? LIMIT 1",
      [publicId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Company not found"
      });
    }

    return res.json(rows[0]);

  } catch (error) {
    console.error("Widget company lookup failed:", error);

    return res.status(500).json({
      error: "Failed to fetch company"
    });
  }
});

export default router;