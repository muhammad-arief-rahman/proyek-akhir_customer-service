import { response } from "@ariefrahman39/shared-utils"
import express from "express"
import multer from "multer"
import router from "./src/routes"
import cookieParser from "cookie-parser"

const app = express()
const port = process.env.PORT || 5003

app.use(express.json({ limit: "50mb" }))
app.use(multer().any())
app.use(cookieParser())

app.use("/", router)

app.use((req, res) => {
  response(res, 404, `Path ${req.path} not Found in customer-service`)
})

app.listen(port, () => {
  console.log(`Customer-Service is running on port ${port}`)
})
