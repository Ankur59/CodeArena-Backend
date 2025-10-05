import express from "express";
import { handleAddToList, handleAllListNames, handleCreateNewList } from "../controllers/list.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get("/getListNames", authMiddleware, handleAllListNames)

router.post("/createList", authMiddleware, handleCreateNewList)

router.post("/addToList", authMiddleware, handleAddToList)

export default router