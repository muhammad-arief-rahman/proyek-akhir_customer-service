import { internalServerError, response } from "@ariefrahman39/shared-utils"
import type { RequestHandler } from "express"
import prisma from "../../../lib/db"

const getByUserId: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      response(res, 404, "User ID not provided")
      return
    }

    const customer = await prisma.customer.findFirst({
      where: {
        userId: userId,
      },
    })

    if (!customer) {
      response(res, 404, "Customer not found")
      return
    }

    response(res, 200, "Customer found", customer)
  } catch (error) {
    internalServerError(res, error)
  }
}

export default getByUserId
