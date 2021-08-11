import { Connection, Repository } from 'typeorm';
import { GetConnection } from '../database';
import { Context, GetPublicKey } from '@wisegar-org/wgo-opengar-core';
import { FinanceMediaService } from './FinanceMediaService';
import BillEntity, { BillStatus } from '../database/entities/BillEntity';
import { CollaboratorService } from './CollaboratorService';
import { TemplateTokens } from '../utils/models';
import { ProductsBill } from '../utils/models';
import BillProductRelationEntity from '../database/entities/BillProductRelationEntity';
import { ProductsService } from './ProductService';
import { ProductType } from '../database/entities/ProductEntity';
import { TransactionService } from './TransactionService';
import { TransactionTypeEnum } from '../database/entities/TransactionEntity';
import { TemplateService } from './TemplateService';
import jsonwebtoken from 'jsonwebtoken';
import OrganizationDataEntity from '../database/entities/OrganizationDataEntity';
import { OrganizationDataService } from './OrganizationDataService';
import { EmailService } from './EmailService';
import { v4 as uuidv4 } from 'uuid';

const PATH_BILL = '/content/BillTemplate.html';
const PATH_EMAIL_BILL = '/content/BillEmailTemplate.html';
const PATH_PAGE_TEMPLATE = '/content/TemplatePage.html';
export class BillsService {
  private connection: Connection;
  private billConnection: Repository<BillEntity>;
  private billProductsConnection: Repository<BillProductRelationEntity>;
  private collaboratorService: CollaboratorService;
  private productsService: ProductsService;
  private financeMediaService: FinanceMediaService;
  private transactionService: TransactionService;
  private templateService: TemplateService;
  private organizationService: OrganizationDataService;
  private emailService: EmailService;
  constructor(userContext?: Context) {
    this.connection = GetConnection();
    this.billConnection = this.connection.getRepository(BillEntity);
    this.billProductsConnection = this.connection.getRepository(BillProductRelationEntity);
    this.financeMediaService = new FinanceMediaService();
    this.collaboratorService = new CollaboratorService(userContext);
    this.productsService = new ProductsService(userContext);
    this.transactionService = new TransactionService(userContext);
    this.organizationService = new OrganizationDataService();
    this.templateService = new TemplateService();
    this.emailService = new EmailService();
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

  async loadTemplate(): Promise<string> {
    return this.templateService.getTemplateContent(PATH_BILL);
  }

  async saveTemplate(value: string) {
    return this.templateService.setTemplateContent(PATH_BILL, value);
  }

  async sendBillLink(id: number, urlApi: string) {
    const bill = await this.billConnection.findOne({
      where: { id },
      relations: ['client', 'billProducts', 'billProducts.product'],
    });
    bill.status = bill.status === BillStatus.Pending ? BillStatus.Sent : bill.status;
    if (!bill.sendDate) {
      bill.sendDate = new Date(Date.now());
    }
    await bill.save();
    const organization = await this.organizationService.getOrganizationData();
    const pageTemplate = this.templateService.getTemplateContent(PATH_PAGE_TEMPLATE);
    const emailTemplate = this.templateService.getTemplateContent(PATH_EMAIL_BILL);
    const template = await this.loadTemplate();
    const tokensTemplate = this.getBillTokens(bill, organization, template);
    const tokensTable = this.getBillTableTokens(bill);
    const nameFile = `${uuidv4()}.html`;
    const path = this.templateService.createDocument(nameFile, pageTemplate, tokensTemplate, tokensTable);
    const secret = GetPublicKey();
    const token = jsonwebtoken.sign({ clientId: bill.client.id, nameDoc: nameFile, billId: bill.id }, secret);

    const urlBill = `${urlApi}${path}?token=${token}`;
    const emailTokens = this.getBillEmailTokens(bill.client.name, urlBill);
    this.emailService.sendEmail(
      organization.name,
      bill.client.email,
      //`${bill.client.name} <${bill.client.email}>`,
      'Bill info',
      this.templateService.replaceTokens(emailTemplate, emailTokens)
    );
    console.log(urlBill);
    return urlBill;
  }

  getBillEmailTokens(name: string, link: string) {
    const tokens = <TemplateTokens>{};
    tokens['[NAME]'] = name;
    tokens['[BILL_LINK]'] = link;
    return tokens;
  }

  getBillTokens(bill: BillEntity, organization: OrganizationDataEntity, template: string) {
    const tokens = <TemplateTokens>{};
    tokens['[TITLEPAGE]'] = 'Bill';
    tokens['[BODYPAGE]'] = template;
    tokens['[CLIENT_NAME]'] = bill.client.name;
    tokens['[CLIENT_ADDRESS]'] = bill.client.address;
    tokens['[CLIENT_EMAIL]'] = bill.client.email;
    tokens['[BILL_TOTAL]'] = `${bill.totalPrice}`;
    tokens['[BILL_ID]'] = 'Preguntar!!!!';
    tokens['[BILL_STATUS]'] = bill.status === BillStatus.Payed ? 'Payed' : 'Unpaid';
    const date = bill.sendDate;
    tokens['[BILL_SEND_DATE]'] = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    return tokens;
  }

  getBillTableTokens(bill: BillEntity) {
    const tokens: TemplateTokens[] = bill.billProducts.map((billProd, index) => {
      const tokensBill = <TemplateTokens>{};
      tokensBill['[INDEX]'] = `${index + 1}`;
      tokensBill['[PRODUCT_NAME]'] = billProd.product.name;
      tokensBill['[PRODUCT_QTY]'] = `${billProd.count}`;
      tokensBill['[PRODUCT_PRICE]'] = `${billProd.price}`;
      tokensBill['[PRODUCT_AMOUNT]'] = `${billProd.price * billProd.count}`;
      return tokensBill;
    });
    return tokens;
  }
}
