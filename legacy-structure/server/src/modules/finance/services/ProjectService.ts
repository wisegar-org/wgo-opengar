import { Connection, Repository } from 'typeorm';
import { ProjectEntity } from '../database/entities/ProjectEntity';
import { GetConnection } from '../database';

export class ProjectService {
  private connection: Connection;
  private projectConnection: Repository<ProjectEntity>;
  constructor() {
    this.connection = GetConnection();
    this.projectConnection = this.connection.getRepository(ProjectEntity);
  }

  async addProject(numberId: number, title: string): Promise<ProjectEntity> {
    const result = await this.projectConnection.findOne({
      id: numberId,
    });
    if (result !== undefined) {
      return result;
    }

    const proj = new ProjectEntity(numberId, title);
    return await this.projectConnection.manager.save(proj);
  }

  async updateOrInsertProject(numberId: number, title: string): Promise<ProjectEntity> {
    let project = await this.projectConnection.findOne({
      id: numberId,
    });
    if (project !== undefined) {
      project.title = title;
      return await project.save();
    } else {
      project = new ProjectEntity(numberId, title);
      return await this.projectConnection.manager.save(project);
    }
  }

  async findProjectById(numberId: number): Promise<ProjectEntity | undefined> {
    return await this.projectConnection.findOne({
      id: numberId,
    });
  }

  async findProjectsById(projectsIds: number[]) {
    return await this.projectConnection.findByIds(projectsIds);
  }

  async getAllProject(): Promise<ProjectEntity[]> {
    return await this.projectConnection.find();
  }
}
