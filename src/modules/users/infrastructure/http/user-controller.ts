import { Request, Response } from "express";

import { UserUseCases } from "../../application/user-use-cases";

import { UserMapper } from "../../mappers/user-mapper";
import { ErrorResponseCreator } from "../../../../utils/error-response-creator";
import { ResponseCreator } from "../../../../utils/response-creator";
import { ObjectValidator } from "../../../../utils/object-validator";

export class UserController {

  constructor(private readonly userUseCases: UserUseCases) { }

  async getAll(req: Request, res: Response): Promise<Response> {
    const response: ResponseCreator | ErrorResponseCreator = await this.userUseCases.getAll();
    return res.status(response.statusCode).send(response.response)
  };

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const response: ResponseCreator | ErrorResponseCreator = await this.userUseCases.getById(id);
    return res.status(response.statusCode).send(response.response);
  };

  async create(req: Request, res: Response) {

    let response: ResponseCreator | ErrorResponseCreator;

    const creationalDTO = UserMapper.toCreationalDTO(req.body);
    const validation = ObjectValidator.hasUndefinedValues(creationalDTO)

    if (!validation?.valid) {
      response = new ErrorResponseCreator(`Bad Request: ${validation?.cause}`, 400)
    } else {
      response = await this.userUseCases.create(creationalDTO);
    }

    return res.status(response.statusCode).send(response.response);
  };

  async updateById(req: Request, res: Response) {
    const { id } = req.params;
    const mappedUserDTO = UserMapper.toUpdaterDTO(req.body);
    const response: ResponseCreator | ErrorResponseCreator = await this.userUseCases.update(id, mappedUserDTO);
    return res.status(response.statusCode).send(response.response);
  };

  async deleteById(req: Request, res: Response) {
    const { id } = req.params;
    const response: ResponseCreator | ErrorResponseCreator = await this.userUseCases.deleteById(id);
    return res.status(response.statusCode).send(response.response);
  };

}
