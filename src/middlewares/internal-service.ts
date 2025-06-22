import type { RequestHandler } from "express"
import { response } from "@ariefrahman39/shared-utils"

const InternalServiceMiddleware: RequestHandler = (req, res, next) => {
  if (
    !req.headers["x-service-secret"] ||
    req.headers["x-service-secret"] !== process.env.SERVICE_SECRET
  ) {
    response(res, 403, "Forbidden", {
      error: "Invalid or missing service secret",
    })
  }

  next()
}

export default InternalServiceMiddleware
