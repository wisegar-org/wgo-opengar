import { Express } from 'express';
import { Connection } from 'typeorm';
import { AuthorizeUserRol, RolEntityEnum } from '@wisegar-org/wgo-opengar-core';
import { ProductsService } from '../services/ProductService';

export const ProductController = (app: Express, conn: Connection) => {
  app.get('/api/products', AuthorizeUserRol(), async (req, res) => {
    const transactionService = new ProductsService(req.context);
    const result = {
      products: await transactionService.getAllProducts(),
    };
    res.send(result);
  });
  app.post('/api/addProduct', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const expenseService = new ProductsService(req.context);
    const { name, description, buyPrice, sellPrice, unitCount, type, docs } = req.body;

    const product = await expenseService.addProduct(name, description, buyPrice, sellPrice, unitCount, type, docs);
    res.send({ created: !!product, products: [product] });
  });
  app.post('/api/updateProduct', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const expenseService = new ProductsService(req.context);
    const { id, name, description, buyPrice, sellPrice, unitCount, type, docs } = req.body;
    const product = await expenseService.updateProductById(
      id,
      name,
      description,
      buyPrice,
      sellPrice,
      unitCount,
      type,
      docs
    );
    res.send({ updated: !!product });
  });

  app.get('/api/productDetail', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const expenseService = new ProductsService(req.context);
    const { id } = req.query;
    const result = {
      products: await expenseService.getProductDetailsById(parseInt(id.toString())),
    };
    res.send(result);
  });
};
