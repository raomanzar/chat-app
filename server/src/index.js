import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import "dotenv/config";
import { auth } from "./lib/better-auth.js";
import { friendRouter } from "./modules/friend/friend.routes.js";
import { chatRouter } from "./modules/chat/chat.routes.js";

const app = express();

// app.use(
//   cors({
//     origin: ["http://localhost:8081", "http://192.168.103.161:8081"],
//     credentials: true,
//   }),
// );

app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());

app.use("/api/friend", friendRouter);
app.use("/api/chat", chatRouter);

const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
