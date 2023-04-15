
import logger from "../../../../../utils/logger";
import { ResponseCreator } from "../../../../../utils/response-creator";
import { ErrorResponseCreator } from "../../../../../utils/error-response-creator";

import { IUser } from "../../../domain/iuser";
import { User } from "../../../domain/mongo/mongo-user";
import { IUserRepository } from "../../../domain/iuser-repository";
import { IUpdateUserDTO } from "../../../mappers/user-mapper";

// capa de base de datos - "service" en un MVC => queries

export class MongoUserRepository implements IUserRepository {

  async getAll(): Promise<ResponseCreator | ErrorResponseCreator> {
    
    try {

      const allUsers: IUser[] | [] = await User.find();

      if (allUsers.length === 0) {
        logger.warn('No Users in DB');
        return new ResponseCreator('No News in DB', 404)
      }

      logger.info('All News sent to client');
      return new ResponseCreator(allUsers, 200);

    } catch (err) {
      logger.error(err);
      return new ErrorResponseCreator('Something went wrong', 500);
    };
  };

  async getById(id: string): Promise<ResponseCreator | ErrorResponseCreator> {

    try {

      const foundUser: IUser[] | null = await User.findById(id);

      if (!foundUser) {
        logger.warn('User not found');
        return new ResponseCreator('User not found', 404)
      }

      logger.info(`User with ID : ${id} sent to client`);
      return new ResponseCreator(foundUser, 200);

    } catch (err) {
      logger.error(err);
      return new ErrorResponseCreator('Something went wrong', 500);
    }
  }

  async create(creationalDTO: IUser): Promise<ResponseCreator | ErrorResponseCreator> {
    
    try {

      const foundUser = await User.findOne({ email: creationalDTO.email });

      if (foundUser) {
        return new ResponseCreator('User with that email already exists', 304)
      }

      const newUser = new User(creationalDTO);
      await newUser.save();

      logger.info('New User created');

      return new ResponseCreator('New User created', 201)

    } catch (err) {
      logger.error(err);
      return new ErrorResponseCreator('Something went wrong', 500);
    };
  };

  async updateById(id: string, updaterDTO: IUpdateUserDTO): Promise<ResponseCreator | ErrorResponseCreator> {

    try {

      const foundUser: IUser | null = await User.findById(id);

      if (!foundUser) {
        logger.warn('User not found');
        return new ResponseCreator('User not found', 404)
      }


      await User.findByIdAndUpdate(id, updaterDTO);
      logger.info(`User with id ${id} updated`);
      return new ResponseCreator('User updated', 200)

    } catch (err) {
      logger.error(err);
      return new ErrorResponseCreator('Something went wrong', 500);
    }

  }

  async deleteById(id: string): Promise<ResponseCreator | ErrorResponseCreator> {

    try {

      const foundUser: IUser[] | null = await User.findById(id);

      if (!foundUser) {
        logger.warn('User not found');
        return new ResponseCreator('User not found', 404)
      }


      await User.findByIdAndDelete(id);

      logger.info(`User with ID : ${id} deleted`);
      return new ResponseCreator('User deleted', 200);

    } catch (err) {
      logger.error(err);
      return new ErrorResponseCreator('Something went wrong', 500);
    }


  }
}; 
