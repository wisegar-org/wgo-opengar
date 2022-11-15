import { DataSource, ObjectType, Repository } from "typeorm";
import { Actions } from ".";
import { UserEntity } from "../../authentication/database/entities/UserEntity";
import { WGBaseEntity } from "../../core/database/entities/WGBaseEntity";
import { IContextBase } from "../../core/models/context";
import { HistoricEntity } from "../database/entities/HistoricEntity";
import {
  DEFAULT_EDIT_MESSAGE,
  WRONG_CONTEXT_USER,
  WRONG_CONTEXT_USER_EMAIL,
  WRONG_CONTEXT_USER_ID,
  WRONG_ENTITY_ID_UNDEFINED,
} from "./constants";

export class HistoricModel<TEntity extends WGBaseEntity> {
  private dataSource: DataSource;
  private repository: Repository<HistoricEntity>;
  private readonly type: ObjectType<TEntity>;
  private context?: IContextBase;
  /**
   *
   */
  constructor(type: ObjectType<TEntity>, context: IContextBase) {
    this.context = context;
    this.dataSource = this.context.dataSource;
    this.repository = this.dataSource.getRepository(HistoricEntity);
    this.type = type;
  }

  public async getHistory(entityRecordId: number): Promise<HistoricEntity[]> {
    const history = await this.repository.find({
      where: { entity: this.type.name, recordId: entityRecordId },
    });
    return history;
  }

  public async getAllHistory() {
    const history = await this.repository.find({
      where: { entity: this.type.name },
    });
    return history;
  }

  public async getAllHistoryByUser(userId: number) {
    const history = await this.repository.find({
      where: { entity: this.type.name, userId: userId },
    });
    return history;
  }

  public getHistoryModel(entity: TEntity) {
    if (!this.context?.user) throw WRONG_CONTEXT_USER;
    if (!this.context.user.id) throw WRONG_CONTEXT_USER_ID;
    if (!this.context.user.email) throw WRONG_CONTEXT_USER_EMAIL;

    if (!entity.id) throw WRONG_ENTITY_ID_UNDEFINED;

    const {
      user: { id, email },
    } = this.context;

    return {
      action: Actions.Unknown,
      entity: this.type.name,
      message: DEFAULT_EDIT_MESSAGE,
      recordId: entity.id,
      userId: id,
      username: email,
      snapshot: "{}",
    };
  }

  public async getHistoryPage(skip: number, take: number) {
    return await this.getHistoryPageByCriteria(
      {
        entity: this.type.name,
      },
      { id: "DESC" },
      skip,
      take
    );
  }

  public async getHistoryPageByCriteria(
    whereQuery: any,
    orderQuery: any,
    skip: number,
    take: number
  ) {
    const history = await this.repository.findAndCount({
      where: whereQuery,
      order: orderQuery,
      skip,
      take,
    });
    return history;
  }

  public async create(entity: HistoricEntity): Promise<HistoricEntity> {
    if (!!entity.id)
      throw `Impossibile creare una nuova entity con un id valido`;
    const result = await this.repository.insert(entity);
    if (!result.identifiers || result.identifiers.length === 0)
      throw `Non è stato possibile registrare il nuovo record!`;

    return result.raw;
  }

  public async createMany(
    historyEntities: HistoricEntity[]
  ): Promise<HistoricEntity[]> {
    if (!this.context) return [];
    const inserResult = await this.repository.insert(historyEntities);
    if (!inserResult.identifiers || inserResult.identifiers.length === 0)
      throw `Non è stato possibile registrare il nuovo record!`;

    return inserResult.raw;
  }

  public async createAccessHistory(entity: UserEntity, customMessage?: string) {
    const historyModel = {
      action: Actions.Access,
      entity: this.type.name,
      message: !customMessage ? `Accesso` : customMessage,
      recordId: entity.id,
      userId: entity.id,
      username: entity.email,
      snapshot: "{}",
    };
    return this.create(Object.assign(new HistoricEntity(), historyModel));
  }

  public async createPostHistory(entity: TEntity, customMessage?: string) {
    if (!this.context) return undefined;
    const historyModel = this.getHistoryModel(entity);

    historyModel.message = !customMessage ? `Creato` : customMessage;
    historyModel.action = Actions.Add;
    return this.create(Object.assign(new HistoricEntity(), historyModel));
  }

  public async createPutHistory(entity: TEntity, customMessage?: string) {
    if (!this.context) return undefined;
    const historyModel = this.getHistoryModel(entity);
    historyModel.action = Actions.Update;
    historyModel.message = !customMessage ? `Modificato` : customMessage;
    return this.create(Object.assign(new HistoricEntity(), historyModel));
  }

  public async createPutManyHistory(
    entities: TEntity[],
    customMessage?: string
  ) {
    if (!this.context) return undefined;
    const historyModels = entities.map((entity) =>
      this.getHistoryModel(entity)
    );
    for (let HistoricEntityModel of historyModels) {
      HistoricEntityModel.action = Actions.Update;
      HistoricEntityModel.message = !customMessage
        ? `Modificato da modifica massiva`
        : customMessage;
    }
    const historyEntities = historyModels.map((historyModel) =>
      Object.assign(new HistoricEntity(), historyModel)
    );
    return await this.createMany(historyEntities);
  }

  public async createDeleteHistory(entity: TEntity, customMessage?: string) {
    if (!this.context) return undefined;
    const historyModel = this.getHistoryModel(entity);
    historyModel.action = Actions.SoftDelete;
    historyModel.message = !customMessage ? `Cancellato soft` : customMessage;
    historyModel.snapshot = JSON.stringify(entity);
    return this.create(Object.assign(new HistoricEntity(), historyModel));
  }

  public async createDeleteHardHistory(
    entity: TEntity,
    customMessage?: string
  ) {
    if (!this.context) return undefined;
    const historyModel = this.getHistoryModel(entity);
    historyModel.action = Actions.Delete;
    historyModel.message = !customMessage ? `Cancellato` : customMessage;
    historyModel.snapshot = JSON.stringify(entity);
    return this.create(Object.assign(new HistoricEntity(), historyModel));
  }

  public async createRestoreHistory(entity: TEntity, customMessage?: string) {
    if (!this.context) return undefined;
    const historyModel = this.getHistoryModel(entity);
    historyModel.action = Actions.Restore;
    historyModel.message = !customMessage ? `Restore` : customMessage;
    historyModel.snapshot = JSON.stringify(entity);
    return this.create(Object.assign(new HistoricEntity(), historyModel));
  }

  public async getHistoryFilters() {
    const entitiesFilter = await this.repository
      .createQueryBuilder("")
      .select("distinct entity", "entity")
      .orderBy("entity", "ASC")
      .getRawMany();
    const actionsFilter = await this.repository
      .createQueryBuilder("")
      .select("distinct action", "action")
      .orderBy("action", "ASC")
      .getRawMany();
    const usernamesFilter = await this.repository
      .createQueryBuilder("")
      .select("distinct username", "username")
      .orderBy("username", "ASC")
      .getRawMany();

    return {
      entities: entitiesFilter.map((item) => item.entity),
      actions: actionsFilter.map((item) => item.action),
      usernames: usernamesFilter.map((item) => item.username),
    };
  }

  public static ParseHistoryResponse(HistoricEntity: HistoricEntity) {
    return {
      action: HistoricEntity.action,
      creatoIl: HistoricEntity.creatoIl,
      id: HistoricEntity.id,
      message: HistoricEntity.message,
      modificatoIl: HistoricEntity.modificatoIl,
      userId: HistoricEntity.userId,
      username: HistoricEntity.username,
      snapshot: HistoricEntity.snapshot,
      entity: HistoricEntity.entity,
    };
  }
}
