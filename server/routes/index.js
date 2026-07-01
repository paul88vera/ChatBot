import express from "express";
const router = express.Router();
import chatApi from "./chat.js";

router.use("/chat", chatApi);

export default router;
