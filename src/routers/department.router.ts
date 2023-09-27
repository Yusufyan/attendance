import express from "express";

import { createDepartmentController, getAllDepartmentController, getDepartmentDetailController } from "../controllers/department.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const departmentRouter = express.Router()

departmentRouter.get(
    "/",
    authMiddleware,
    getAllDepartmentController)
departmentRouter.get(
    "/:name",
    authMiddleware,
    getDepartmentDetailController
)
departmentRouter.post(
    "/",
    authMiddleware,
    createDepartmentController
)
departmentRouter.patch(
    "/",
    authMiddleware,
)



export default departmentRouter;