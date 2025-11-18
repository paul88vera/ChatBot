const express = require("express");
const router = express.Router();
const chatApi = require("./chat");
const companyApi = require("./company");

router.use("/chat", chatApi);
router.use("/company", companyApi);

module.exports = router;
