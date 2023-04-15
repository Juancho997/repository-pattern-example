import { Router } from "express";

import { userController } from "../dependencies";

const userRouter = Router();

userRouter.get('/', userController.getAll.bind(userController));
userRouter.get('/:id', userController.getById.bind(userController));
userRouter.post('/', userController.create.bind(userController));
userRouter.put('/:id', userController.updateById.bind(userController));
userRouter.delete('/:id', userController.deleteById.bind(userController));

export default userRouter;
