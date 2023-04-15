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

        const entries = Object.entries(raw);
        const filteredEntries = entries.filter(([key, value]) => value !== undefined);
        const filteredDTO = Object.fromEntries(filteredEntries);

        return filteredDTO;
    }

};
