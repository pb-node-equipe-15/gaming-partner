import "express-async-errors";
import express from "express";
import handleErrorMiddleware from "./middlewares/handleError.middleware";

import gamesRouter from "./routes/games.routes";
import sessionRouter from "./routes/session.routes";
import userRouter from "./routes/user.routes";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/games", gamesRouter);

app.use(handleErrorMiddleware);

export default app;
