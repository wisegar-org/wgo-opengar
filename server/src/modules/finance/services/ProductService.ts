import { Connection, Repository } from 'typeorm';
import { GetConnection } from '../database';
import { ProductEntity, ProductType } from '../database/entities/ProductEntity';
import { Context } from '@wisegar-org/wgo-opengar-core';
import { FinanceMediaService } from './FinanceMediaService';

export class ProductsService {
  private connection: Connection;
  private productConnection: Repository<ProductEntity>;
  private financeMediaService: FinanceMediaService;
  constructor(userContext?: Context) {
    this.connection = GetConnection();
    this.productConnection = this.connection.getRepository(ProductEntity);
    this.financeMediaService = new FinanceMediaService();
  }

  async addProduct(
    name: string,
    description: string,
    buyPrice: number,
    sellPrice: number,
    unitCount: number,
    type: ProductType,
    docs: number[] = []
  ): Promise<ProductEntity | null> {
    const product = new ProductEntity(name, description, buyPrice, sellPrice, unitCount, type);
    product.docs = await this.financeMediaService.getMediaList(docs);

    return await this.productConnection.manager.save(product);
  }

  async getAllProducts(): Promise<any[]> {
    const result = await this.productConnection.find({
      order: { name: 'ASC' },
    });

    const products = result.map((prod: ProductEntity) => {
      return {
        id: prod.id,
        name: prod.name,
        description: prod.description,
        sellPrice: prod.sellPrice,
        buyPrice: prod.buyPrice,
        unitCount: prod.unitCount,
        type: prod.type,
        docs: prod.docs,
      };
    });
    return products;
  }

  async updateProductById(
    id: number,
    name: string,
    description: string,
    buyPrice: number,
    sellPrice: number,
    unitCount: number,
    type: ProductType,
    docs: number[] = []
  ): Promise<ProductEntity | undefined> {
    const product = await this.productConnection.findOne({ id: id });
    if (product) {
      product.name = name;
      product.description = description;
      product.buyPrice = buyPrice;
      product.sellPrice = sellPrice;
      product.unitCount = unitCount;
      product.type = type;
      product.docs = await this.financeMediaService.getMediaList(docs);
      return this.productConnection.manager.save(product);
    }
    return product;
  }

  async getProductById(id: number): Promise<ProductEntity> {
    const prod = await this.productConnection.findOne({
      where: {
        id,
      },
    });

    return prod;
  }

  async getProductDetailsById(id: number) {
    const result = await this.productConnection.find({
      relations: ['docs'],
      where: { id },
    });

    const products = result.map((prod: ProductEntity) => {
      const docs = prod.docs.map((media) => ({
        id: media.id,
        fileName: media.fileName,
        type: media.mimeType,
        displayName: media.displayName,
      }));
      return {
        id: prod.id,
        name: prod.name,
        description: prod.description,
        sellPrice: prod.sellPrice,
        buyPrice: prod.buyPrice,
        unitCount: prod.unitCount,
        type: prod.type,
        docs: docs,
      };
    });
    return products;
  }
}
