import { Request, Response } from "express";

import { UserUseCases } from "../../application/user-use-cases";
import { UserNotFound } from "../../domain/user-not-found";

export class UserController {
  constructor(private readonly userByIdFinder: UserUseCases) {}

  async getById(req: Request, res: Response) {
    try {
      const user = await this.userByIdFinder.getById(req.params.id);

      return res.status(200).send(user);
    } catch (error) {
      if (error instanceof UserNotFound) {
        return res.status(404).send();
      }

      return res.status(500).send("Something went wrong");
    }
  }
}
