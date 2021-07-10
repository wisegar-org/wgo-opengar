import { Connection, Repository } from 'typeorm'
import { OrganizationDataEntity } from '../database/entities/OrganizationDataEntity'
import { GetConnection } from '../database'

export class OrganizationDataController {
  private connection: Connection
  private organizationDataConnection: Repository<OrganizationDataEntity>
  constructor() {
    this.connection = GetConnection()
    this.organizationDataConnection = this.connection.getRepository(
      OrganizationDataEntity
    )
  }

  async setOrganizationData(
    name: string,
    description: string,
    address: string,
    phone: string,
    email: string,
    accountingInternetPrice: number,
    accountingUnit: string,
    accountingCoin: string,
    accountingLabel: string
  ): Promise<OrganizationDataEntity> {
    let organizationData = await this.organizationDataConnection.findOne({
      id: 1
    })
    if (!organizationData) {
      organizationData = new OrganizationDataEntity(1)
    }

    organizationData.accountingInternetPrice =
      accountingInternetPrice || organizationData.accountingInternetPrice
    organizationData.address = address || organizationData.address
    organizationData.description = description || organizationData.description
    organizationData.email = email || organizationData.email
    organizationData.name = name || organizationData.name
    organizationData.phone = phone || organizationData.phone
    organizationData.accountingUnit =
      accountingUnit || organizationData.accountingUnit
    organizationData.accountingCoin =
      accountingCoin || organizationData.accountingCoin
    organizationData.accountingLabel = accountingLabel || organizationData.accountingLabel

    return await organizationData.save()
  }

  async getOrganizationData(): Promise<OrganizationDataEntity> {
    let organizationData = await this.organizationDataConnection.findOne({
      id: 1
    })
    if (!organizationData) {
      organizationData = new OrganizationDataEntity(1)
    }
    return organizationData
  }
}
