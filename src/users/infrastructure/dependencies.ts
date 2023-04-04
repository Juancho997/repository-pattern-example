// import { MongoUserRepository } from "./mongo-user-repository";
import { UserUseCases } from "../application/user-use-cases";
import { UserController } from "./http/user-controller";
import { ElasticUserRepository } from "./user-repository/elastic-user-repository";

// const mongoUserRepository = new MongoUserRepository();
const elasticUserRepository = new ElasticUserRepository();

const userUseCases = new UserUseCases(elasticUserRepository);

export const userController = new UserController(userUseCases);
