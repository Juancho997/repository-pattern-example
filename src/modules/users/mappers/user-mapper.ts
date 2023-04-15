import { ObjectValidator } from "../../../utils/object-validator"

export interface ICreateUserDTO {
    email: string,
    first_name: string,
    last_name: string,
    password: string
}

export interface IUpdateUserDTO {
    email?: string,
    first_name?: string,
    last_name?: string,
    password?: string
};


export class UserMapper {

    public static toCreationalDTO(raw: any): ICreateUserDTO {
        return {
            email: raw.email,
            first_name: raw.first_name,
            last_name: raw.last_name,
            password: raw.password
        }

    };

    public static toUpdaterDTO(raw: any): IUpdateUserDTO {
        return ObjectValidator.filterUnusedKeys(raw);
    }

};