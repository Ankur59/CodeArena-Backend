import express from "express";
import { handleIsUnique } from "../controllers/username.controller.js";

const router = express.Router()


router.get("/isUnique", handleIsUnique)


export default router