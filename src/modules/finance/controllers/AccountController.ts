import { IssueController } from './IssuesController'
import { AccountEntity, AccountingStatus } from './../database/entities/AccountEntity'
import { Connection, Repository } from 'typeorm'
import { GetConnection } from '../database'
import { RepositoryController } from './RepositoryController'
import { CollaboratorController, ProjectController } from '.'
import { TransactionController } from './TransactionController'
import { OrganizationDataController } from './OrganizationDataController'
import { ExpensesController } from './ExpensesController'
import { Context } from '@wisegar-org/wgo-opengar-core'

export class AccountController {
  private connection: Connection
  private accountConnection: Repository<AccountEntity>
  private collaboratorController: CollaboratorController
  private projectController: ProjectController
  private repositoryController: RepositoryController
  private issueController: IssueController
  private transactionController: TransactionController
  private expenseController: ExpensesController

  private orgDataController: OrganizationDataController

  constructor(userContext?: Context) {
    // debugger
    this.connection = GetConnection()
    this.accountConnection = this.connection.getRepository(AccountEntity)
    this.collaboratorController = new CollaboratorController(userContext)
    this.projectController = new ProjectController()
    this.repositoryController = new RepositoryController()
    this.issueController = new IssueController(userContext)
    this.transactionController = new TransactionController(userContext)
    this.expenseController = new ExpensesController(userContext)
    this.orgDataController = new OrganizationDataController()
  }

  async Add(
    total_hours: number,
    contributorId: number,
    projectsIds: number[],
    reposIds: number[],
    issuesIds: number[],
    pay_by_hours: number,
    pay_to_internet: number,
    internet_cost: number,
    taxes: number,
    details: string,
    payment_comment: string,
    initDate: string,
    endDate: string
  ): Promise<AccountEntity> {
    if (!process.env.API_TOKEN) {
      throw Error('Github module error: API_TOKEN is empty.')
    }

    const token: string = process.env.API_TOKEN

    const AccountLabel = (await this.orgDataController.getOrganizationData()).accountingLabel

    const collaborator = contributorId
      ? await this.collaboratorController.findCollaboratorById(contributorId)
      : undefined
    const projects = projectsIds ? await this.projectController.findProjectsById(projectsIds) : undefined
    const repos = reposIds ? await this.repositoryController.findRepositoriesById(reposIds) : undefined
    const issues = issuesIds ? await this.issueController.findIssuesById(issuesIds) : undefined

    const total_issues = issuesIds ? issuesIds.length : 0

    const total_projects = projectsIds ? projectsIds.length : 0

    const total_repos = reposIds ? reposIds.length : 0

    const account = new AccountEntity(
      total_hours,
      total_issues,
      total_projects,
      total_repos,
      pay_by_hours,
      pay_to_internet,
      internet_cost,
      taxes,
      details,
      payment_comment,
      collaborator,
      projects,
      repos,
      new Date(initDate),
      new Date(endDate)
    )
    const accountResult = await this.accountConnection.manager.save(account)

    if (issues) {
      for (const issue of issues) {
        const iss = await this.issueController.updateAccount(issue.id, accountResult.id, accountResult)
        if (iss) {
          try {
            await this.issueController.setLabel(
              iss.owner,
              iss.repo,
              issue.number,
              AccountLabel || 'FAKE ACCOUNT FROM WGO-GITHUB PAGE',
              token
            )
          } catch (error) {
            console.log('============================================================')
            console.log('ACCOUNTING ERROR: ', error)
            console.log('============================================================')
          }
        }
      }
    }

    return await this.accountConnection.manager.save(accountResult)
  }

  async editAccountingData(id: number, taxes: number, details: string, payment_comment: string): Promise<boolean> {
    const accounting = await this.accountConnection.findOne({
      id: id
    })

    if (accounting) {
      accounting.taxes = taxes || 0
      accounting.details = details ? details : accounting.details
      accounting.payment_comment = payment_comment ? payment_comment : accounting.payment_comment
      await accounting.save()

      return true
    } else return false
  }

  async removeAccount(id: number, token: string): Promise<boolean> {
    const accounting = await this.accountConnection.findOne({
      id: id
    })

    if (accounting) {
      // Restaurar todas las issues involugradas en el account eliminandole el label en github
      // Eliminar la relacion de cada issue con el accounting
      // Cambiar el accounting del estado Pending al estado al Restored
      const orgDataController = new OrganizationDataController()
      const accountLabel = (await orgDataController.getOrganizationData()).accountingLabel || 'FakeAccount'
      await this.issueController.removeAccount(id, accountLabel, token)
      accounting.status = AccountingStatus.Cancelled
      await accounting.save()

      return true
    }
    return false
  }

  async getAllAccounts(): Promise<AccountEntity[]> {
    const filter = await this.collaboratorController.getFilterByCollaborator('contributorId')
    return await this.accountConnection.find({
      where: { ...filter },
      relations: ['contributor', 'projects', 'repos'],
      order: { id: 'DESC' }
    })
  }

  async getAccountingById(id: number): Promise<AccountEntity | undefined> {
    const filter = await this.collaboratorController.getFilterByCollaborator('contributorId')
    return await this.accountConnection.findOne({
      where: {
        ...filter,
        id: id
      },
      relations: ['contributor', 'projects', 'repos']
    })
  }

  async confirmAccountById(id: number): Promise<boolean> {
    const accounting = await this.accountConnection.findOne({
      where: { id: id }
    })
    if (!!accounting) {
      if (accounting.status === AccountingStatus.Pending) {
        const expense = await this.expenseController.createExpenseByAccounting(accounting)
        if (!!expense) {
          accounting.status = AccountingStatus.Confirmed
          await accounting.save()
          return true
        }
      }
    }
    return false
  }
}
