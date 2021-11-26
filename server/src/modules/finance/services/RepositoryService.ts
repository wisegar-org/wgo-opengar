import { Connection, Repository } from 'typeorm';
import { RepositoryEntity } from '../database/entities/RepositoryEntity';
import { GetConnection } from '../database';

export class RepositoryService {
  private connection: Connection;
  private repositoryConnection: Repository<RepositoryEntity>;
  constructor() {
    this.connection = GetConnection();
    this.repositoryConnection = this.connection.getRepository(RepositoryEntity);
  }

  async addRepository(numberId: number, title: string): Promise<RepositoryEntity> {
    const result = await this.repositoryConnection.findOne({
      id: numberId,
    });
    if (result !== undefined) {
      return result;
    }

    const repo = new RepositoryEntity(numberId, title);
    return await this.repositoryConnection.manager.save(repo);
  }

  async updateOrInsertRepository(numberId: number, title: string): Promise<RepositoryEntity> {
    let repository = await this.repositoryConnection.findOne({
      id: numberId,
    });
    if (repository !== undefined) {
      repository.title = title;
      return await repository.save();
    } else {
      repository = new RepositoryEntity(numberId, title);
      return await this.repositoryConnection.manager.save(repository);
    }
  }

  async findRepositoryById(numberId: number): Promise<RepositoryEntity | undefined> {
    return await this.repositoryConnection.findOne({
      id: numberId,
    });
  }

  async findRepositoriesById(reposIds: number[]) {
    return await this.repositoryConnection.findByIds(reposIds);
  }

  async getAllRepository(): Promise<RepositoryEntity[]> {
    return await this.repositoryConnection.find();
  }
}
