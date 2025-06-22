import type { RequestHandler } from "express"
import { internalServerError, response } from "@ariefrahman39/shared-utils"

const checkStatus: RequestHandler = async (req, res) => {
  try {
    response(res, 200, "Customer Service is running", {
      status: "success",
    })
  } catch (err) {
    internalServerError(res, err)
  }
}

const MiscController = {
  checkStatus,
}

export default MiscController
