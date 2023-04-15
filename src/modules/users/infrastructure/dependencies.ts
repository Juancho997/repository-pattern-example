import { MongoUserRepository } from "./user-repository/mongo/mongo-user-repository";
import { UserUseCases } from "../application/user-use-cases";
import { UserController } from "./http/user-controller";


// DB Repository
const mongoUserRepository = new MongoUserRepository();
const userUseCases = new UserUseCases(mongoUserRepository);
const userController = new UserController(userUseCases);


export { userController }