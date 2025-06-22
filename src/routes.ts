import { Router } from "express"
import DataController from "./controllers/data"
import MiscController from "./controllers/misc"
import InternalServiceMiddleware from "./middlewares/internal-service"

const router = Router()

router.get("/", MiscController.checkStatus)

router.get("/data", DataController.getAll)
router.post("/data/store", InternalServiceMiddleware, DataController.store)

export default router
