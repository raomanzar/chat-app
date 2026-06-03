import { Router } from "express";
import { requireAuth } from "../../middlewares/require-auth.js";
import {
  acceptRequest,
  cancelRequest,
  discover,
  listFriends,
  rejectRequest,
  sendRequest,
} from "./friend.controller.js";

export const friendRouter = Router();

friendRouter.use(requireAuth);

friendRouter.get("/discover", discover);
friendRouter.get("/friendList", listFriends);
friendRouter.post("/request", sendRequest);
friendRouter.post("/request/:requestId/accept", acceptRequest);
friendRouter.post("/request/:requestId/reject", rejectRequest);
friendRouter.post("/request/:requestId/cancel", cancelRequest);
