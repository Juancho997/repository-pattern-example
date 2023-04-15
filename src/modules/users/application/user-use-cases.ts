import { IUserRepository } from "../domain/iuser-repository";
import { ResponseCreator } from "../../../utils/response-creator";
import { ErrorResponseCreator } from "../../../utils/error-response-creator";
import { ICreateUserDTO, IUpdateUserDTO } from "../mappers/user-mapper";

// caso(s) de uso
// capa intermedia entre "controller" y "services", siguiendo un patrón MVC
// el llamado al repositorio
// quizas con una sola clase que englobe a todos los casos de uso sería más práctico

export class UserUseCases {
  constructor(private readonly userRepository: IUserRepository) { }

  async getAll(): Promise<ResponseCreator | ErrorResponseCreator> {
    const response = await this.userRepository.getAll();
    return response;
  };

  async getById(id: string): Promise<ResponseCreator | ErrorResponseCreator> {
    const response = await this.userRepository.getById(id);
    return response;
  };

  async create(creationalDTO: ICreateUserDTO): Promise<ResponseCreator | ErrorResponseCreator> {
    const response = await this.userRepository.create(creationalDTO);
    return response;
  };

  async update(id: string, updaterDTO: IUpdateUserDTO): Promise<ResponseCreator | ErrorResponseCreator> {
    const response = await this.userRepository.updateById(id, updaterDTO);
    return response;
  };

  async deleteById(id: string): Promise<ResponseCreator | ErrorResponseCreator> {
    const response = await this.userRepository.deleteById(id);
    return response;
  };

};
