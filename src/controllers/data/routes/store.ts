import type { RequestHandler } from "express"
import {
  internalServerError,
  response,
  zodHandler,
} from "@ariefrahman39/shared-utils"
import storeCustomerSchema, { type StoreCustomerSchemaArray } from "../../../schema/customer/store"
import type { ZodError } from "zod"
import prisma from "../../../lib/db"

 const store: RequestHandler = async (req, res) => {
  try {
    const data = req.body as unknown[]

    if (!Array.isArray(data)) {
      response(res, 400, "Invalid data format. Expected an array.", {
        data: ["Must be an array of objects."],
      })
      return
    }

    const errors = data?.map((item: unknown) => {
      try {
        storeCustomerSchema.parse(item)
      } catch (error) {
        return zodHandler(error as ZodError)
      }
    })

    if (errors?.some((error) => error)) {
      response(res, 422, "Validation error", errors)
      return
    }

    // Assert data
    const parsedData = data as StoreCustomerSchemaArray

    // Upsert data into the database
    const customerData = await Promise.all(
      parsedData.map(async (item) => {
        return await prisma.customer.upsert({
          where: {
            organizationId: item.organizationId,
          },
          create: {
            organizationId: item.organizationId,
            industry: item.industry,
            name: item.name,
            subGroup: item.subGroup,
          },
          update: {
            industry: item.industry,
            name: item.name,
            subGroup: item.subGroup,
          },
        })
      })
    )

    response(res, 200, "Data stored successfully", {
      data: customerData,
    })
  } catch (error) {
    console.error("Error storing data:", error)
    internalServerError(res, error)
  }
}

export default store