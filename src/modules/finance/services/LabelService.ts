import { Connection, Repository } from 'typeorm';
import { LabelEntity } from '../database/entities/LabelEntity';
import { GetConnection } from '../database';

export class LabelService {
  private connection: Connection;
  private labelConnection: Repository<LabelEntity>;
  constructor() {
    this.connection = GetConnection();
    this.labelConnection = this.connection.getRepository(LabelEntity);
  }

  async addLabel(numberId: number, title: string): Promise<LabelEntity> {
    const result = await this.labelConnection.findOne({
      id: numberId,
    });
    if (result !== undefined) {
      return result;
    }

    const label = new LabelEntity(numberId, title);
    return await this.labelConnection.manager.save(label);
  }

  async updateOrInsertLabel(numberId: number, title: string): Promise<LabelEntity> {
    let label = await this.labelConnection.findOne({
      id: numberId,
    });
    if (label !== undefined) {
      label.title = title;
      return await label.save();
    } else {
      label = new LabelEntity(numberId, title);
      return await this.labelConnection.manager.save(label);
    }
  }

  async findLabelById(numberId: number): Promise<LabelEntity | undefined> {
    return await this.labelConnection.findOne({
      id: numberId,
    });
  }

  async getAllLabels(): Promise<LabelEntity[]> {
    return await this.labelConnection.find();
  }
}
