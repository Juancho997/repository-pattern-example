import { User } from "../domain/user";
import { UserNotFound } from "../domain/user-not-found";
import { UserRepository } from "../domain/user-repository";

// caso(s) de uso
// el llamado al repositorio
// quizas con una sola clase que englobe a todos los casos de uso sería más práctico

// class userQueries
export class UserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new UserNotFound(id);
    }

    return user;
  }

  // async getAll(){}
  // async create(){}
  // async update(){}
  // async delete(){}
}
