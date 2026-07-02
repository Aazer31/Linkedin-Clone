import express from "express"

const postRouter = express.Router()

postRouter.post("/create", isAuth, upload.single("image"), createPost)

export default postRouter