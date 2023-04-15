import { IProduct } from "../domain/iproduct";
import { IProductRepository } from "../domain/iproduct-repository";
import { ResponseCreator } from "../../../utils/response-creator";
import { ErrorResponseCreator } from "../../../utils/error-response-creator";
import { IUpdateProductDTO } from "../mappers/product-mapper";

export class ProductUseCases {
    constructor(private readonly productRepository: IProductRepository) { }

    async getAll(): Promise<ResponseCreator | ErrorResponseCreator> {
        const response = await this.productRepository.getAll();
        return response;
    };

    async getById(id: string): Promise<ResponseCreator | ErrorResponseCreator> {
        const response = await this.productRepository.getById(id);
        return response;
    };

    async create(creationalDTO: IProduct): Promise<ResponseCreator | ErrorResponseCreator> {
        const response = await this.productRepository.create(creationalDTO);
        return response;
    };

    async update(id: string, updaterDTO: IUpdateProductDTO): Promise<ResponseCreator | ErrorResponseCreator> {
        const response = await this.productRepository.updateById(id, updaterDTO);
        return response;
    };

    async deleteById(id: string): Promise<ResponseCreator | ErrorResponseCreator> {
        const response = await this.productRepository.deleteById(id);
        return response;
    };

};
