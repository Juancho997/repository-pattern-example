import { Router } from "express";

import { productController } from "../dependencies";

const productRouter = Router();

productRouter.get('/', productController.getAll.bind(productController));
productRouter.get('/:id', productController.getById.bind(productController));
productRouter.post('/', productController.create.bind(productController));
productRouter.put('/:id', productController.updateById.bind(productController));
productRouter.delete('/:id', productController.deleteById.bind(productController));

export default productRouter;
