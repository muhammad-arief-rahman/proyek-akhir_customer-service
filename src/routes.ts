import { Router } from "express"
import DataController from "./controllers/data"
import MiscController from "./controllers/misc"
import { InternalServiceMiddleware } from "./middlewares"
import AuthMiddleware from "@ariefrahman39/shared-utils"

const router = Router()

router.get("/", MiscController.checkStatus)

router.get(
  "/data",
  AuthMiddleware.authenticate("admin"),
  DataController.getAll
)
router.post("/data/store", InternalServiceMiddleware, DataController.store)

router.patch(
  "/data/:id",
  (req, res, next) => {
    console.log("Patch request received for data with ID:", req.params.id)
    console.log("CCookies:", req.cookies)
    console.log("Headers:", req.headers)
    next()
  },
  AuthMiddleware.authenticate("admin"),
  DataController.patch
)

export default router
