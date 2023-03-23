import { Connection, Repository } from 'typeorm';
import { GetConnection } from '../database';
import { TransactionEntity, TransactionTypeEnum } from '../database/entities/TransactionEntity';
import { CollaboratorService } from './CollaboratorService';
import { AccountEntity } from '../database/entities/AccountEntity';
import { Context } from '@wisegar-org/wgo-opengar-core';

export class TransactionService {
  private connection: Connection;
  private transactionConnection: Repository<TransactionEntity>;
  private collaboratorController: CollaboratorService;
  constructor(userContext?: Context) {
    this.connection = GetConnection();
    this.transactionConnection = this.connection.getRepository(TransactionEntity);
    this.collaboratorController = new CollaboratorService(userContext);
  }

  async addTransaction(
    status: string,
    date: Date,
    cost: number,
    card_balance: number,
    collaboratorId: number
  ): Promise<TransactionEntity | null> {
    const collaborator = await this.collaboratorController.findCollaboratorById(collaboratorId);
    if (collaborator !== undefined) {
      const repo = new TransactionEntity(status, date, cost, card_balance, collaborator);
      return await this.transactionConnection.manager.save(repo);
    }
    return null;
  }

  async getAllTransactions(): Promise<TransactionEntity[]> {
    const filter = await this.collaboratorController.getFilterByCollaborator('collaboratorId');
    return await this.transactionConnection.find({
      where: { ...filter },
      relations: ['collaborator'],
      order: { id: 'DESC' },
    });
  }

  async createTransactionByAccounting(accounting: AccountEntity): Promise<TransactionEntity | undefined> {
    if (accounting.value === 0) {
      accounting.value = accounting.getTotalToPay();
      await accounting.save();
    }
    const total_to_pay = accounting.value;
    return await this.createTransactionByCollaborator(
      accounting.contributorId,
      0,
      total_to_pay,
      'Confirmed accounting'
    );
  }

  async createTransactionByCollaborator(
    idCollaborator: number,
    sourceID: number,
    total_to_pay: number,
    description: string,
    type: TransactionTypeEnum = TransactionTypeEnum.Expense
  ) {
    if (!idCollaborator) {
      const transaction = new TransactionEntity(description, new Date(), total_to_pay, total_to_pay);
      transaction.sourceID = sourceID;
      transaction.type = type;
      return await this.transactionConnection.manager.save(transaction);
    }

    const transactionByColl = await this.transactionConnection.find({
      where: { collaboratorId: idCollaborator },
      relations: ['collaborator'],
    });

    const transactionsLength = transactionByColl.length;
    const balance = transactionsLength > 0 ? transactionByColl[transactionsLength - 1].card_balance : 0;
    const collaborator =
      transactionsLength > 0
        ? transactionByColl[0].collaborator
        : await this.collaboratorController.findCollaboratorById(idCollaborator);

    if (collaborator) {
      const transaction = new TransactionEntity(
        description,
        new Date(),
        total_to_pay,
        balance - total_to_pay,
        collaborator
      );
      transaction.sourceID = sourceID;
      transaction.type = type;
      return await this.transactionConnection.manager.save(transaction);
    }

    return undefined;
  }

  async setIdTransaction(id: number, transactionId: string) {
    const transaction = await this.transactionConnection.findOne({ id });
    if (transaction) {
      transaction.idTransaction = transactionId;
      return await this.transactionConnection.manager.save(transaction);
    }

    return undefined;
  }

  async getTransactionBySourceID(idSource: number, transactionType: TransactionTypeEnum) {
    const transaction = await this.transactionConnection.findOne({
      where: {
        sourceID: idSource,
        type: transactionType,
      },
    });

    return transaction;
  }
}
