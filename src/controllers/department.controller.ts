import { Request, Response } from "express"
import {
  genDepartment,
  getAllDepartment,
  getDepartmentByName,
  softDeleteDepartment,
  updateDepartment,
} from "../services/department.service"
import {
  CreateDepartmentDTO,
  GetDepartmentByNameDTO,
} from "../dtos/department.dto"
import { AppException } from "../utils/exception.util"

export async function createDepartmentController(req: Request, res: Response) {
  try {
    const body = req.body as CreateDepartmentDTO
    console.log(body)
    const response = await genDepartment(body)
    console.log(response)
    res.status(200).json({ message: "Success. Department added", data: response })
  } catch (error) {
    res.status(500).json({ error: "Interal server error" })
  }
}

export async function getAllDepartmentController(req: Request, res: Response) {
  try {
    const response = await getAllDepartment()
    console.log(response)
    res.status(200).json({ message: "Success", data: response })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

export async function getDepartmentDetailController(
  req: Request,
  res: Response
) {
  try {
    const param = req.params["name"]
    const response = await getDepartmentByName(param)

    if (!response) {
      res.status(404).json({ error: "Department not found" })
    }

    res.status(200).json({ message: "Success.", data: response })
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export async function updateDepartmentController(req: Request, res: Response) {
  try {
    const param = req.params
    const body = req.body
    const response = await updateDepartment(param, body)

    if (!response) {
      res.status(400).json({ error: 'Update Department Data Failed!' })
    }

    res.status(200).json({ message: 'Updated Department Data Success', data: body })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error'})
  }
}

export async function softDeleteDepartmentController(req: Request, res: Response) {
  try {
    const param = req.params
    const response = await softDeleteDepartment(param)

    if(!response) {
      res.status(400).json({ error: 'Delete Department Data Failed'})
    }
    res.status(200).json({ message: 'Delete Department Data Success'})
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
