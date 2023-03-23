import { Connection, Repository } from 'typeorm';
import { GetConnection } from '../database';
import { ExpenseEntity, ExpenseStatusEnum } from '../database/entities/ExpenseEntity';
import AccountEntity from '../database/entities/AccountEntity';
import { CollaboratorService } from './CollaboratorService';
import { Context, FrequencyRepeatEnum } from '@wisegar-org/wgo-opengar-core';
import { FinanceMediaService } from './FinanceMediaService';
import { TransactionService } from './TransactionService';
import { TransactionTypeEnum } from '../database/entities/TransactionEntity';

export class ExpensesService {
  private connection: Connection;
  private expenseConnection: Repository<ExpenseEntity>;
  private transactionController: TransactionService;
  private collaboratorController: CollaboratorService;
  private financeMediaService: FinanceMediaService;
  constructor(userContext?: Context) {
    this.connection = GetConnection();
    this.expenseConnection = this.connection.getRepository(ExpenseEntity);
    this.transactionController = new TransactionService(userContext);
    this.collaboratorController = new CollaboratorService(userContext);
    this.financeMediaService = new FinanceMediaService();
  }

  async addExpense(
    name: string,
    description: string,
    cost: number,
    date: Date,
    collaboratorId: number,
    status: ExpenseStatusEnum,
    repeat: FrequencyRepeatEnum,
    bildDocs: number[] = []
  ): Promise<ExpenseEntity | null> {
    const expense = new ExpenseEntity(name, description, cost, date, status, repeat);
    expense.bildDocs = await this.financeMediaService.getMediaList(bildDocs);

    const coll = await this.collaboratorController.findCollaboratorById(collaboratorId);
    if (coll) {
      expense.collaborator = coll;
    }
    return await this.expenseConnection.manager.save(expense);
  }

  async getAllExpenses(): Promise<any[]> {
    const result = await this.expenseConnection.find({
      relations: ['collaborator'],
      order: { id: 'DESC' },
    });

    const expenses = result.map((exp: ExpenseEntity) => {
      return {
        cost: exp.cost,
        date: exp.date,
        description: exp.description,
        id: exp.id,
        name: exp.name,
        status: exp.status,
        repeat: exp.repeat,
        bildDocs: exp.bildDocs,
        collaborator: exp.collaborator,
        collaboratorId: exp.collaboratorId,
      };
    });
    return expenses;
  }

  async getExpenseDetailsById(id: number) {
    const result = await this.expenseConnection.find({
      relations: ['bildDocs', 'collaborator'],
      where: { id },
    });

    const expenses = result.map((exp: ExpenseEntity) => {
      const docs = exp.bildDocs.map((media) => ({
        id: media.id,
        fileName: media.fileName,
        type: media.mimeType,
        displayName: media.displayName,
      }));
      return {
        cost: exp.cost,
        date: exp.date,
        description: exp.description,
        id: exp.id,
        name: exp.name,
        status: exp.status,
        repeat: exp.repeat,
        bildDocs: docs,
        collaborator: exp.collaborator,
        collaboratorId: exp.collaboratorId,
      };
    });
    return expenses.length ? expenses : undefined;
  }

  async changeStatus(id: number, status: number): Promise<ExpenseEntity | undefined> {
    let expense = await this.expenseConnection.findOne({ id: id });
    if (expense) {
      expense.status = status in ExpenseStatusEnum ? status : ExpenseStatusEnum.ToByPayed;
      expense = await expense.save();

      this.transactionController.createTransactionByCollaborator(
        expense.collaboratorId,
        expense.id,
        -expense.cost,
        `Expense Transaction ${expense.id}`,
        TransactionTypeEnum.Expense
      );
    }
    return expense;
  }

  async updateExpenseById(
    id: number,
    name: string,
    description: string,
    cost: number,
    date: Date,
    collaboratorId: number,
    repeat: FrequencyRepeatEnum,
    bildDocs: number[] = []
  ): Promise<ExpenseEntity | undefined> {
    const expense = await this.expenseConnection.findOne({ id: id });
    if (expense && expense.status === ExpenseStatusEnum.ToByPayed) {
      expense.name = name;
      expense.description = description;
      expense.cost = cost;
      expense.repeat = repeat;
      expense.date = date;
      expense.bildDocs = await this.financeMediaService.getMediaList(bildDocs);
      const coll = await this.collaboratorController.findCollaboratorById(collaboratorId || 0);
      if (coll) {
        expense.collaborator = coll;
      }
      return this.expenseConnection.manager.save(expense);
    }
    return expense;
  }

  async createExpenseByAccounting(accounting: AccountEntity): Promise<ExpenseEntity | undefined> {
    if (accounting.value === 0) {
      accounting.value = accounting.getTotalToPay();
      await accounting.save();
    }
    const total_to_pay = accounting.value;
    const collaborator = await this.collaboratorController.findCollaboratorById(accounting.contributorId);
    const expense = new ExpenseEntity(
      'Confirmed accounting',
      `Pay to ${collaborator ? collaborator.name : ''} (${collaborator ? collaborator.login : ''})`,
      total_to_pay,
      new Date(),
      ExpenseStatusEnum.ToByPayed,
      FrequencyRepeatEnum.Never
    );
    if (collaborator) {
      expense.collaborator = collaborator;
    }
    return await expense.save();
  }
}
