const express = require("express");
const router = express.Router();
const chatApi = require("./chat");

router.use("/chat", chatApi);

module.exports = router;
