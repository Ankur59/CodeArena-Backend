import express from "express";
import { handleAllListNames } from "../controllers/list.controller.js";

const router = express.Router()

router.get("/getListNames", handleAllListNames)

export default router