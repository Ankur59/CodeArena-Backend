import express from "express";
import { handleRefresh, handleCheck } from "../controllers/refresh.controller.js"

const router = express.Router()

router.route("/").get(handleRefresh)


router.route("/check").get(handleCheck)

export default router   