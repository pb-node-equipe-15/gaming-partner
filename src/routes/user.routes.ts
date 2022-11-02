import { Router } from "express";

const userRouter = Router();

userRouter.post("");
userRouter.get("");
userRouter.patch("/:id");
userRouter.delete("/:id");
userRouter.get("/:id/games");

export default userRouter;
