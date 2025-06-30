import {
  internalServerError,
  response,
  zodCatchHandler,
} from "@ariefrahman39/shared-utils"
import type { RequestHandler } from "express"
import prisma from "../../../lib/db"
import { storeCustomerPatchSchema } from "../../../schema/customer/store"

const patch: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params

    const body = req.body

    const customer = await prisma.customer.findUnique({
      where: { id },
    })

    if (!customer) {
      response(res, 404, "Customer not found")
      return
    }

    const parsedData = storeCustomerPatchSchema.parse(body)

    // Disconnect userId if it is not provided in the request body
    if (parsedData.userId) {
      await prisma.customer.updateMany({
        where: {
          userId: parsedData.userId,
        },
        data: {
          userId: null, // Disconnect the userId
        },
      })
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: {
        ...body,
        userId: parsedData.userId || customer.userId, // Preserve userId if not provided
      },
    })

    response(res, 200, "Patch successful", updatedCustomer)
  } catch (error) {
    zodCatchHandler(error, res)
    internalServerError(res, error)
  }
}

export default patch
