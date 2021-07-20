import { Context, FrequencyRepeatEnum } from '@wisegar-org/wgo-opengar-core';
import { Connection, Repository } from 'typeorm';
import { GetConnection } from '../database';
import { ExpenseStatusEnum } from '../database/entities/ExpenseEntity';
import IncomeEntity from '../database/entities/IncomeEntity';
import { TransactionTypeEnum } from '../database/entities/TransactionEntity';
import { FinanceMediaService } from './FinanceMediaService';
import { CollaboratorService } from './CollaboratorService';
import { TransactionService } from './TransactionService';

export class IncomeService {
  private connection: Connection;
  private incomeRepository: Repository<IncomeEntity>;
  private financeMediaService: FinanceMediaService;
  private transactionController: TransactionService;
  private collaboratorController: CollaboratorService;
  constructor(userContext?: Context) {
    this.connection = GetConnection();
    this.incomeRepository = this.connection.getRepository(IncomeEntity);
    this.financeMediaService = new FinanceMediaService();
    this.transactionController = new TransactionService(userContext);
    this.collaboratorController = new CollaboratorService(userContext);
  }

  async getAllIncomes(): Promise<any[]> {
    const result = await this.incomeRepository.find({
      relations: ['collaborator'],
      order: { id: 'DESC' },
    });

    const incomes = result.map((exp: IncomeEntity) => {
      return {
        amount: exp.amount,
        date: exp.date,
        description: exp.description,
        id: exp.id,
        name: exp.name,
        repeat: exp.repeat,
        invoiceDocs: exp.invoiceDocs,
        status: exp.status,
        collaborator: exp.collaborator,
        collaboratorId: exp.collaboratorId,
      };
    });
    return incomes;
  }

  async getIncomeDetailsById(id: number): Promise<any[]> {
    const result = await this.incomeRepository.find({
      relations: ['invoiceDocs', 'collaborator'],
      where: { id },
    });

    const incomes = result.map((exp: IncomeEntity) => {
      const docs = exp.invoiceDocs.map((media) => ({
        id: media.id,
        fileName: media.fileName,
        type: media.mimeType,
        displayName: media.displayName,
      }));
      return {
        amount: exp.amount,
        date: exp.date,
        description: exp.description,
        id: exp.id,
        name: exp.name,
        repeat: exp.repeat,
        invoiceDocs: docs,
        status: exp.status,
        collaborator: exp.collaborator,
        collaboratorId: exp.collaboratorId,
      };
    });
    return incomes.length ? incomes : undefined;
  }

  async addIncome(
    name: string,
    description: string,
    amount: number,
    date: Date,
    collaboratorId: number,
    repeat: FrequencyRepeatEnum,
    invoiceDocs: number[]
  ) {
    const income = new IncomeEntity(name, description, amount, date, repeat);
    income.invoiceDocs = await this.financeMediaService.getMediaList(invoiceDocs);
    const coll = await this.collaboratorController.findCollaboratorById(collaboratorId);
    if (coll) {
      income.collaborator = coll;
    }
    return await this.incomeRepository.manager.save(income);
  }

  async changeStatus(id: number, status: number): Promise<IncomeEntity | undefined> {
    let income = await this.incomeRepository.findOne({ id: id });
    if (income) {
      income.status = status in ExpenseStatusEnum ? status : ExpenseStatusEnum.ToByPayed;
      income = await income.save();

      this.transactionController.createTransactionByCollaborator(
        income.collaboratorId,
        income.id,
        income.amount,
        `Income Transaction ${income.id}`,
        TransactionTypeEnum.Income
      );
    }
    return income;
  }

  async updateIncomeById(
    id: number,
    name: string,
    description: string,
    amount: number,
    date: Date,
    collaboratorId: number,
    repeat: FrequencyRepeatEnum,
    invoiceDocs: number[]
  ) {
    const income = await this.incomeRepository.findOne({ id: id });
    if (income) {
      income.description = description;
      income.name = name;
      income.amount = amount;
      income.repeat = repeat;
      income.date = date;
      income.invoiceDocs = await this.financeMediaService.getMediaList(invoiceDocs);
      const coll = await this.collaboratorController.findCollaboratorById(collaboratorId || 0);
      if (coll) {
        income.collaborator = coll;
      }
      return await this.incomeRepository.manager.save(income);
    }
  }
}
