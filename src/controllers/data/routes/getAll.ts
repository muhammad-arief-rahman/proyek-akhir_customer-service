import type { RequestHandler } from "express"
import { internalServerError, response } from "@ariefrahman39/shared-utils"
import prisma from "../../../lib/db"

const getAll: RequestHandler = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        name: "asc", // Order by name in ascending order
      }
    })

    response(res, 200, "Customers retrieved successfully", customers)
  } catch (error) {
    internalServerError(res, error)
  }
}

export default getAll