const express = require("express");
const router = express.Router();
const chatApi = require("./chat");
const companyApi = require("./company");
const uploadApi = require("./uploads");

router.use("/chat", chatApi);
router.use("/company", companyApi);
router.use("/uploads", uploadApi);

module.exports = router;
