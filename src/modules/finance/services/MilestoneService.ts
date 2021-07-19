import { Connection, Repository } from 'typeorm';
import { MilestoneEntity } from '../database/entities/MilestoneEntity';
import { GetConnection } from '../database';

export class MilestoneService {
  private connection: Connection;
  private milestoneConnection: Repository<MilestoneEntity>;
  constructor() {
    this.connection = GetConnection();
    this.milestoneConnection = this.connection.getRepository(MilestoneEntity);
  }

  async addMilestone(numberId: number, title: string): Promise<MilestoneEntity> {
    const result = await this.milestoneConnection.findOne({
      id: numberId,
    });
    if (result !== undefined) {
      return result;
    }

    const milestone = new MilestoneEntity(numberId, title);
    return await this.milestoneConnection.manager.save(milestone);
  }

  async updateOrInsertMilestone(numberId: number, title: string): Promise<MilestoneEntity> {
    let milestone = await this.milestoneConnection.findOne({
      id: numberId,
    });
    if (milestone !== undefined) {
      milestone.title = title;
      return await milestone.save();
    } else {
      milestone = new MilestoneEntity(numberId, title);
      return await this.milestoneConnection.manager.save(milestone);
    }
  }

  async findMilestoneById(numberId: number): Promise<MilestoneEntity | undefined> {
    return await this.milestoneConnection.findOne({
      id: numberId,
    });
  }

  async getAllMilestones(): Promise<MilestoneEntity[]> {
    return await this.milestoneConnection.find();
  }
}
