import { MongoProductRepository } from "./product-repository/mongo/mongo-product-repository";
import { ProductUseCases } from "../application/product-use-cases";
import { ProductController } from "./http/product-controller";


// DB Repository
const mongoProductRepository = new MongoProductRepository();
const productUseCases = new ProductUseCases(mongoProductRepository);
const productController = new ProductController(productUseCases);


export { productController }