import express from "express";
import {
  getConnectionRequests,
  getConnectionStatus,
  getUserConnections,
  rejectConnection,
  removeConnection,
  sendConnection,
} from "../controllers/connection.controllers.js";
import isAuth from "../middlewares/isAuth.js";


let connectionRouter = express.Router();

connectionRouter.get("/send/:id", isAuth, sendConnection);
connectionRouter.get("/accept/:connectionId", isAuth, sendConnection);
connectionRouter.get("/reject/:connectionId", isAuth, rejectConnection);
connectionRouter.get("/getstatus/:userId", isAuth, getConnectionStatus);
connectionRouter.get("/remove/:userId", isAuth, removeConnection);
connectionRouter.get("/requests", isAuth, getConnectionRequests);
connectionRouter.get("/", isAuth, getUserConnections);

export default connectionRouter;
