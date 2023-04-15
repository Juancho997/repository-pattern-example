import { ObjectValidator } from "../../../utils/object-validator";

export interface IUpdateProductDTO {
    name?: string,
    description?: string,
    price?: number,
    stock?: number
};

export interface ICreateProductDTO {
    name: string,
    description: string,
    price: number,
    stock: number
}

export class ProductMapper {

    public static toCreationalDTO(raw: any): ICreateProductDTO {
        return {
            name: raw.name,
            description: raw.description,
            price: raw.price,
            stock: raw.stock
        }
    };

    public static toUpdaterDTO(raw: any): IUpdateProductDTO {
        return ObjectValidator.filterUnusedKeys(raw);
    }

};
