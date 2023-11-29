import express from "express";

import {
  createDepartmentController,
  getAllDepartmentController,
  getDepartmentDetailController,
  softDeleteDepartmentController,
  updateDepartmentController,
} from "../controllers/department.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const departmentRouter = express.Router();

departmentRouter.get("/", authMiddleware, getAllDepartmentController);
departmentRouter.get("/:name", authMiddleware, getDepartmentDetailController);
departmentRouter.post("/", authMiddleware, createDepartmentController);
departmentRouter.patch("/:id", authMiddleware, updateDepartmentController);
departmentRouter.delete("/", authMiddleware, softDeleteDepartmentController);

export default departmentRouter;
