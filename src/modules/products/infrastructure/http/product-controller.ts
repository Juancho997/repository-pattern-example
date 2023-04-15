import { Request, Response } from "express";

import { ProductUseCases } from "../../application/product-use-cases";
import { ProductMapper } from "../../mappers/product-mapper";

import { ErrorResponseCreator } from "../../../../utils/error-response-creator";
import { ResponseCreator } from "../../../../utils/response-creator";
import { ObjectValidator } from "../../../../utils/object-validator";

export class ProductController {

    constructor(private readonly productUseCases: ProductUseCases) { }

    async getAll(req: Request, res: Response): Promise<Response> {
        const response: ResponseCreator | ErrorResponseCreator = await this.productUseCases.getAll();
        return res.status(response.statusCode).send(response.response)
    };

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const response: ResponseCreator | ErrorResponseCreator = await this.productUseCases.getById(id);
        return res.status(response.statusCode).send(response.response);
    };

    async create(req: Request, res: Response) {

    let response: ResponseCreator | ErrorResponseCreator;

    const creationalDTO = ProductMapper.toCreationalDTO(req.body);
    const validation = ObjectValidator.hasUndefinedValues(creationalDTO)

    if (!validation?.valid) {
      response = new ErrorResponseCreator(`Bad Request: ${validation?.cause}`, 400)
    } else {
      response = await this.productUseCases.create(creationalDTO);
    }
    
        return res.status(response.statusCode).send(response.response);
    };

    async updateById(req: Request, res: Response) {
        const { id } = req.params;
        const mappedProductUserDTO = ProductMapper.toUpdaterDTO(req.body);
        const response: ResponseCreator | ErrorResponseCreator = await this.productUseCases.update(id, mappedProductUserDTO);
        return res.status(response.statusCode).send(response.response);
    };

    async deleteById(req: Request, res: Response) {
        const { id } = req.params;
        const response: ResponseCreator | ErrorResponseCreator = await this.productUseCases.deleteById(id);
        return res.status(response.statusCode).send(response.response);
    };

}
