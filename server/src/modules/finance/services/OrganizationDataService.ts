import { Connection, Repository } from 'typeorm';
import { OrganizationDataEntity } from '../database/entities/OrganizationDataEntity';
import { GetConnection } from '../database';
import _ from 'lodash';

export interface IOrganization {
  name: string;
  description: string;
  address: string;
  phone: string;
  cap: number;
  no: string;
  place: string;
  email: string;
  web: string;
  accountingInternetPrice: number;
  accountingUnit: string;
  accountingCoin: string;
  accountingLabel: string;
  bankName: string;
  bankBIC: string;
  bankIBAN: string;
  bankNo: string;
  banCap: string;
  bankPlace: string;
  bankAddress: string;
  bankValidDays: number;
}
export class OrganizationDataService {
  private connection: Connection;
  private organizationDataConnection: Repository<OrganizationDataEntity>;
  constructor() {
    this.connection = GetConnection();
    this.organizationDataConnection = this.connection.getRepository(OrganizationDataEntity);
  }

  async setOrganizationData(organization: IOrganization): Promise<OrganizationDataEntity> {
    let organizationData = await this.organizationDataConnection.findOne({
      id: 1,
    });
    if (!organizationData) {
      organizationData = new OrganizationDataEntity(1);
    }

    Object.keys(organization).forEach((key) => {
      organizationData[key] = organization[key];
    });

    return await organizationData.save();
  }

  async getOrganizationData(): Promise<OrganizationDataEntity> {
    let organizationData = await this.organizationDataConnection.findOne({
      id: 1,
    });
    if (!organizationData) {
      organizationData = new OrganizationDataEntity(1);
    }
    return organizationData;
  }
}
