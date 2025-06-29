import { Router } from "express"
import DataController from "./controllers/data"
import MiscController from "./controllers/misc"
import { InternalServiceMiddleware } from "./middlewares"
import AuthMiddleware from "./middlewares/AuthMiddleware"

const router = Router()

router.get("/", MiscController.checkStatus)

router.get("/data", AuthMiddleware.authenticate("admin"), DataController.getAll)
router.post("/data/store", InternalServiceMiddleware, DataController.store)

export default router
