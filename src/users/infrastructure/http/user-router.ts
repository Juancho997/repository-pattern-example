import { Router } from "express";

import { userController } from "../dependencies";

const userRouter = Router();

userRouter.get("/:id", userController.getById.bind(userController));

export default userRouter;
