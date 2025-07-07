import { Router } from "express"
import DataController from "./controllers/data"
import MiscController from "./controllers/misc"
import { InternalServiceMiddleware } from "./middlewares"
import { AuthMiddleware } from "@ariefrahman39/shared-utils"

const router = Router()

router.get("/", MiscController.checkStatus)

router.get("/data", DataController.getAll)
router.get("/data/details/:id", DataController.getById)

router.post("/data/store", InternalServiceMiddleware, DataController.store)

router.get("/data-by-user/:userId", DataController.getByUserId)

router.patch(
  "/data/:id",
  AuthMiddleware.authenticate("admin"),
  DataController.patch
)

export default router
