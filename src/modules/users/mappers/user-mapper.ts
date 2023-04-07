import { IUser } from "../domain/iuser";


export interface IUpdateUserDTO {
    email?: string,
    first_name?: string,
    last_name?: string,
    password?: string
    role?: string;
};

export class UserMapper {

    public static toCreationalDTO(raw: any): IUser {
        return {
            email: raw.email,
            first_name: raw.first_name,
            last_name: raw.last_name,
            password: raw.password,
            role: raw.role
        }
    };

    public static toUpdaterDTO(raw: any): IUpdateUserDTO {

        const entries = Object.entries(raw);
        const filteredEntries = entries.filter(([key, value]) => value !== undefined);
        const filteredDTO = Object.fromEntries(filteredEntries);

        return filteredDTO;
    }

};
