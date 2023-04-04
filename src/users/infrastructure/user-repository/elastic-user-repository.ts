import { User } from "../../domain/user";
import { UserRepository } from "../../domain/user-repository";
import { USER_COLLECTION } from "./user-collection";

// capa de base de datos => queries

export class ElasticUserRepository implements UserRepository {
  // getAll, create, update, delete, etc.

  async getById(id: string): Promise<User | null> {
    console.log("Using Elastic");

    const user = USER_COLLECTION.find((user) => user.id === id);

    return user ? new User(user.id, user.name) : null;
  }
}
