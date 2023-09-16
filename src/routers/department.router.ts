import express from "express";

import { createDepartmentController } from "../controllers/department.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const departmentRouter = express.Router()

departmentRouter.post(
    "/",
    authMiddleware,
    createDepartmentController
)

departmentRouter.get(
    "/"
)

export default departmentRouter;