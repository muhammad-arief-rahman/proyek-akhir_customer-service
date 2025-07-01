import type { RequestHandler } from "express"
import { internalServerError, response } from "@ariefrahman39/shared-utils"
import prisma from "../../../lib/db"

const getAll: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.query

    const customers = await prisma.customer.findMany({
      where: {
        userId: userId ? String(userId) : undefined, // Filter by userId if provided

      },
      orderBy: {
        name: "asc", // Order by name in ascending order
      },
    })

    response(res, 200, "Customers retrieved successfully", customers)
  } catch (error) {
    internalServerError(res, error)
  }
}

export default getAll