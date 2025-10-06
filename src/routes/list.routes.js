import express from "express";
import { handleAddToList, handleAllList, handleAllListNames, handleCreateNewList, handleListDetails } from "../controllers/list.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get("/getListNames", authMiddleware, handleAllListNames)

router.post("/createList", authMiddleware, handleCreateNewList)

router.post("/addToList", authMiddleware, handleAddToList)

router.get("/getAllList", authMiddleware, handleAllList)


router.get("/getListDetails", authMiddleware, handleListDetails)

export default router