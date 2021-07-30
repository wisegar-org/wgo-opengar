import { Connection, Repository } from 'typeorm';
import { GetConnection } from '../database';
import { Context } from '@wisegar-org/wgo-opengar-core';
import { FinanceMediaService } from './FinanceMediaService';
import BillEntity, { BillStatus } from '../database/entities/BillEntity';
import { CollaboratorService } from './CollaboratorService';
import { ProductsBill } from '../utils/models';
import BillProductRelationEntity from '../database/entities/BillProductRelationEntity';
import { ProductsService } from './ProductService';
import { ProductType } from '../database/entities/ProductEntity';
import { TransactionService } from './TransactionService';
import { TransactionTypeEnum } from '../database/entities/TransactionEntity';

export class BillsService {
  private connection: Connection;
  private billConnection: Repository<BillEntity>;
  private billProductsConnection: Repository<BillProductRelationEntity>;
  private collaboratorService: CollaboratorService;
  private productsService: ProductsService;
  private financeMediaService: FinanceMediaService;
  private transactionService: TransactionService;
  constructor(userContext?: Context) {
    this.connection = GetConnection();
    this.billConnection = this.connection.getRepository(BillEntity);
    this.billProductsConnection = this.connection.getRepository(BillProductRelationEntity);
    this.financeMediaService = new FinanceMediaService();
    this.collaboratorService = new CollaboratorService(userContext);
    this.productsService = new ProductsService(userContext);
    this.transactionService = new TransactionService(userContext);
  }

  async addBill(
    name: string,
    description: string,
    totalPrice: number,
    clientId: number,
    products: ProductsBill[],
    docs: number[] = []
  ): Promise<BillEntity | null> {
    const client = await this.collaboratorService.findCollaboratorById(clientId);
    let bill = new BillEntity(name, description, totalPrice, client);
    bill.docs = await this.financeMediaService.getMediaList(docs);

    bill = await this.billConnection.manager.save(bill);

    const productsInBill = [];
    for await (let prodB of products) {
      if (!prodB.remove) {
        const product = await this.productsService.getProductById(prodB.productId);
        const prodInBill = new BillProductRelationEntity(
          bill,
          product,
          parseInt(prodB.count.toString()),
          product.sellPrice,
          product.type
        );
        if (prodInBill.type === ProductType.Product) {
          product.unitCount = product.unitCount - prodInBill.count;
          await product.save();
        }
        productsInBill.push(prodInBill);
      }
    }
    await this.billProductsConnection.insert(productsInBill);
    return bill;
  }

  async getAllBills(): Promise<any[]> {
    const result = await this.billConnection.find({
      relations: ['client', 'billProducts', 'billProducts.product'],
      order: { id: 'DESC' },
    });

    const bills = result.map((bill: BillEntity) => {
      return {
        id: bill.id,
        name: bill.name,
        description: bill.description,
        client: bill.client,
        clientId: bill.clientId,
        totalPrice: bill.totalPrice,
        docs: bill.docs,
        products: bill.billProducts.map((prodBill) => ({ ...prodBill, productId: prodBill.product.id })),
        status: bill.status,
        date: bill.date,
      };
    });
    return bills;
  }

  async updateBillById(
    id: number,
    name: string,
    description: string,
    totalPrice: number,
    clientId: number,
    products: ProductsBill[],
    docs: number[] = []
  ): Promise<BillEntity | undefined> {
    let bill = await this.billConnection.findOne({ id: id });
    if (bill) {
      const client = await this.collaboratorService.findCollaboratorById(clientId);
      bill.name = name;
      bill.description = description;
      bill.client = client;
      bill.totalPrice = totalPrice;
      bill.docs = await this.financeMediaService.getMediaList(docs);
      bill = await this.billConnection.manager.save(bill);

      for await (let billProd of products) {
        const product = await this.productsService.getProductById(billProd.productId);
        if (!product) continue;
        let billp = await this.billProductsConnection.findOne({
          where: {
            product: product.id,
            bill: bill.id,
          },
        });
        if (billProd.remove) {
          if (billp) {
            if (billp.type === ProductType.Product) {
              product.unitCount = product.unitCount + billp.count;
              await product.save();
            }
            this.billProductsConnection.manager.remove(billp);
          }
        } else {
          if (!billp) {
            billp = new BillProductRelationEntity(bill, product, billProd.count, product.sellPrice, product.type);
            if (billp.type === ProductType.Product) {
              product.unitCount = product.unitCount - billp.count;
              await product.save();
            }
          } else {
            if (billp.type === ProductType.Product) {
              product.unitCount = product.unitCount - (billProd.count - billp.count);
              await product.save();
            }
            billp.count = billProd.count;
          }
          await this.billProductsConnection.manager.save(billp);
        }
      }
    }
    return bill;
  }

  async getBillDetailsById(id: number) {
    const result = await this.billConnection.find({
      relations: ['docs', 'client', 'billProducts', 'billProducts.product'],
      where: { id },
    });

    const bill = result.map((bill: BillEntity) => {
      const docs = bill.docs.map((media) => ({
        id: media.id,
        fileName: media.fileName,
        type: media.mimeType,
        displayName: media.displayName,
      }));
      return {
        id: bill.id,
        name: bill.name,
        description: bill.description,
        client: bill.client,
        clientId: bill.clientId,
        totalPrice: bill.totalPrice,
        products: bill.billProducts.map((prodBill) => ({ ...prodBill, productId: prodBill.product.id })),
        docs: docs,
        status: bill.status,
        date: bill.date,
      };
    });
    return bill;
  }

  async payBill(id: number) {
    const bill = await this.billConnection.findOne({ where: { id } });
    if (bill) {
      const transaction = await this.transactionService.createTransactionByCollaborator(
        bill.clientId,
        bill.id,
        bill.totalPrice,
        `Bill Transaction ${bill.id}`,
        TransactionTypeEnum.Bill
      );
      if (transaction) {
        bill.status = BillStatus.Payed;
        await this.billConnection.manager.save(bill);
      }
    }
    return bill;
  }

  async cancelBill(id: number) {
    const bill = await this.billConnection.findOne({
      where: { id },
      relations: ['billProducts', 'billProducts.product'],
    });
    if (bill) {
      for await (let productBill of bill.billProducts) {
        const prod = productBill.product;
        prod.unitCount = prod.unitCount + productBill.count;
        await prod.save();
      }

      bill.status = BillStatus.Cancelled;
      await this.billConnection.manager.save(bill);
    }
    return bill;
  }
}
