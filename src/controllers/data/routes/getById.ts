import { internalServerError, response } from "@ariefrahman39/shared-utils"
import type { RequestHandler } from "express"
import prisma from "../../../lib/db"

const getById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      response(res, 404, "Customer ID not provided")
      return
    }

    const customer = await prisma.customer.findFirst({
      where: {
        id,
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

export default getById
