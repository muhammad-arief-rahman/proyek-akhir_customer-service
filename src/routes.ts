import { Router } from "express"
import DataController from "./controllers/data"
import MiscController from "./controllers/misc"
import { InternalServiceMiddleware } from "./middlewares"
import { AuthMiddleware } from "@ariefrahman39/shared-utils"

const router = Router()

router.get("/", MiscController.checkStatus)

router.get(
  "/data",
  (req, res, next) => {
    console.log("Cookies:", req.cookies)
    console.log("Headers:", req.headers)

    next()
  },
  AuthMiddleware.authenticate("admin"),
  DataController.getAll
)
router.post("/data/store", InternalServiceMiddleware, DataController.store)

router.patch(
  "/data/:id",

  AuthMiddleware.authenticate("admin"),
  DataController.patch
)

export default router
