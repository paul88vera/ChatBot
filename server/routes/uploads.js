import express from "express";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from "uuid";
import s3 from "../lib/s3";
import upload from "../lib/upload.js";
import db from "../db/connections.js";

const router = express.Router();

router.post("/company-avatar/:publicId", upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const { publicId } = req.params;

    const fileExt = req.file.originalname.split(".").pop();
    const key = `avatars/${publicId}/${uuidv4()}.${fileExt}`;

    const uploadTask = new Upload({
      client: s3,
      params: {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: "public-read",
      },
    });

    await uploadTask.done();

    const url = `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${key}`;

    const connection = await db();
    await connection.query(
      "UPDATE companies SET avatarUrl = ? WHERE publicId = ?",
      [url, publicId]
    );

    res.json({ success: true, avatarUrl: url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
