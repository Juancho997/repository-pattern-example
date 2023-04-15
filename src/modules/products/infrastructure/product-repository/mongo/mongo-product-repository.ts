import logger from "../../../../../utils/logger";
import { ResponseCreator } from "../../../../../utils/response-creator";
import { ErrorResponseCreator } from "../../../../../utils/error-response-creator";

import { IProduct } from "../../../domain/iproduct";
import { Product } from "../../../domain/mongo/mongo-product";
import { IProductRepository } from "../../../domain/iproduct-repository";
import { ICreateProductDTO, IUpdateProductDTO } from "../../../mappers/product-mapper";

// capa de base de datos - "service" en un MVC => queries

export class MongoProductRepository implements IProductRepository {

    async getAll(): Promise<ResponseCreator | ErrorResponseCreator> {

        try {

            const allProducts: IProduct[] | [] = await Product.find();

            if (allProducts.length === 0) {
                logger.warn('No Products in DB');
                return new ResponseCreator('No Products in DB', 404)
            }

            logger.info('All Products sent to client');
            return new ResponseCreator(allProducts, 200);

        } catch (err) {
            logger.error(err);
            return new ErrorResponseCreator('Something went wrong', 500);
        };
    };

    async getById(id: string): Promise<ResponseCreator | ErrorResponseCreator> {

        try {

            const foundProduct: IProduct[] | null = await Product.findById(id);

            if (!foundProduct) {
                logger.warn('Product not found');
                return new ResponseCreator('Product not found', 404)
            }

            logger.info(`Product with ID : ${id} sent to client`);
            return new ResponseCreator(foundProduct, 200);

        } catch (err) {
            logger.error(err);
            return new ErrorResponseCreator('Something went wrong', 500);
        }
    }

    async create(creationalDTO: ICreateProductDTO): Promise<ResponseCreator | ErrorResponseCreator> {

        try {

            const foundProduct = await Product.findOne({ name: creationalDTO.name });

            if (foundProduct) {
                return new ResponseCreator('Product with that name already exists', 304)
            }

            const newProduct = new Product(creationalDTO);
            await newProduct.save();

            logger.info('New Product created');

            return new ResponseCreator('New Product created', 201)

        } catch (err) {
            logger.error(err);
            return new ErrorResponseCreator('Something went wrong', 500);
        };
    };

    async updateById(id: string, updaterDTO: IUpdateProductDTO): Promise<ResponseCreator | ErrorResponseCreator> {

        try {

            const foundProduct: IProduct | null = await Product.findById(id);

            if (!foundProduct) {
                logger.warn('Product not found');
                return new ResponseCreator('Product not found', 404)
            }


            await Product.findByIdAndUpdate(id, updaterDTO);
            logger.info(`Product with id ${id} updated`);
            return new ResponseCreator('Product updated', 200)

        } catch (err) {
            logger.error(err);
            return new ErrorResponseCreator('Something went wrong', 500);
        }

    }

    async deleteById(id: string): Promise<ResponseCreator | ErrorResponseCreator> {

        try {

            const foundProduct: IProduct[] | null = await Product.findById(id);

            if (!foundProduct) {
                logger.warn('Product not found');
                return new ResponseCreator('Product not found', 404)
            }


            await Product.findByIdAndDelete(id);

            logger.info(`Product with ID : ${id} deleted`);
            return new ResponseCreator('Product deleted', 200);

        } catch (err) {
            logger.error(err);
            return new ErrorResponseCreator('Something went wrong', 500);
        }


    }
}; 
