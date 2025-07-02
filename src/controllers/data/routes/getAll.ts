import type { RequestHandler } from "express"
import { internalServerError, response } from "@ariefrahman39/shared-utils"
import prisma from "../../../lib/db"

const getAll: RequestHandler = async (req, res) => {
  try {
    const { userId, unlinked = "false" } = req.query

    if (unlinked === "true") {
      const customers = await prisma.customer.findMany({
        where: {
          OR: [
            { userId: null }, // Unlinked customers
            { userId: userId ? String(userId) : undefined }, // Customers linked to the user
          ],
        },
      })

      response(res, 200, "Unlinked customers retrieved successfully", customers)
      return
    }

    const customers = await prisma.customer.findMany({
      where: {
        userId: userId ? String(userId) : undefined, // Only customers linked to the user
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
