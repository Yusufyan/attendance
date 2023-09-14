import express from "express";

import { createDepartment } from "../controllers/department.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const departmentRouter = express.Router()

departmentRouter.post(
    "/insert",
    authMiddleware,
    createDepartment
)

export default departmentRouter;