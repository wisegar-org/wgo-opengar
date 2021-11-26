import { Connection, Repository } from 'typeorm';
import { IssueEntity } from '../database/entities/IssueEntity';
import { CollaboratorService } from './CollaboratorService';
import { ProjectService } from './ProjectService';
import { GetConnection } from '../database';
import { RepositoryService } from './RepositoryService';
import { AccountEntity } from '../database/entities/AccountEntity';
import Requestable from 'github-api/dist/components/Requestable';
import { Context } from '@wisegar-org/wgo-opengar-core';

export class IssueService {
  private connection: Connection;
  private issueConnection: Repository<IssueEntity>;
  private collaboratorController: CollaboratorService;
  private projectController: ProjectService;
  private repositoryController: RepositoryService;

  constructor(userContext?: Context) {
    this.connection = GetConnection();
    this.issueConnection = this.connection.getRepository(IssueEntity);
    this.collaboratorController = new CollaboratorService(userContext);
    this.projectController = new ProjectService();
    this.repositoryController = new RepositoryService();
  }

  async addIssue(
    numberId: number,
    owner: string,
    repository: string,
    title: string,
    status: string,
    hours: number,
    last_comment: string,
    created_at: Date,
    closed_at: Date,
    updated_at: Date,
    number: number,
    description: string,
    url: string,
    collaboratorId?: number,
    projectId?: number,
    repositoryId?: number,
    labels?: string[],
    milestones?: string
  ): Promise<IssueEntity> {
    const result = await this.issueConnection.findOne({
      id: numberId,
    });
    if (result !== undefined) {
      return result;
    }

    const collaborator = collaboratorId
      ? await this.collaboratorController.findCollaboratorById(collaboratorId)
      : undefined;
    const project = projectId ? await this.projectController.findProjectById(projectId) : undefined;
    const repo = repositoryId ? await this.repositoryController.findRepositoryById(repositoryId) : undefined;

    const proj = new IssueEntity(
      numberId,
      owner,
      repository,
      title,
      status,
      hours,
      created_at,
      closed_at,
      updated_at,
      number,
      description,
      url,
      last_comment,
      collaborator,
      project,
      repo,
      labels,
      milestones
    );
    return await this.issueConnection.manager.save(proj);
  }

  async updateOrInsertIssue(
    numberId: number,
    owner: string,
    repository: string,
    title: string,
    status: string,
    hours: number,
    last_comment: string,
    created_at: Date,
    closed_at: Date,
    updated_at: Date,
    number: number,
    description: string,
    url: string,
    collaboratorId?: number,
    projectId?: number,
    repositoryId?: number,
    labels?: string[],
    milestones?: string
  ): Promise<IssueEntity> {
    let issue = await this.issueConnection.findOne({
      id: numberId,
    });

    const collaborator = collaboratorId
      ? await this.collaboratorController.findCollaboratorById(collaboratorId)
      : undefined;
    const project = projectId ? await this.projectController.findProjectById(projectId) : undefined;
    const repo = repositoryId ? await this.repositoryController.findRepositoryById(repositoryId) : undefined;
    if (issue !== undefined) {
      issue.title = title || issue.title;
      issue.status = status || issue.status;
      issue.hours = hours || 0;
      issue.assignedToId = collaborator ? collaborator.id : issue.assignedToId;
      issue.projectId = project ? project.id : issue.projectId;
      issue.labels = labels ? labels.join(', ') : issue.labels;
      issue.milestones = milestones || issue.milestones;
      issue.last_comment = last_comment || issue.last_comment;

      issue.created_at = created_at || issue.created_at;
      issue.closed_at = closed_at || issue.closed_at;
      issue.updated_at = updated_at || issue.updated_at;

      issue.number = number || issue.number;
      issue.owner = owner || issue.owner;
      issue.repo = repository || issue.repo;

      issue.description = description || issue.description;
      issue.url = url || issue.url;

      if (collaborator) {
        issue.assignedToId = collaborator.id;
        issue.assignedTo = collaborator;
      }
      if (project) {
        issue.projectId = project.id;
        issue.project = project;
      }
      if (repo) {
        issue.repositoryId = repo.id;
        issue.repository = repo;
      }

      issue.accountId = issue.accountId;
      issue.account = issue.account;

      return await issue.save();
    } else {
      const proj = new IssueEntity(
        numberId,
        owner,
        repository,
        title,
        status,
        hours,
        created_at,
        closed_at,
        updated_at,
        number,
        description,
        url,
        last_comment,
        collaborator,
        project,
        repo,
        labels,
        milestones
      );
      return await this.issueConnection.manager.save(proj);
    }
  }

  async updateAccount(id: number, accountId: number, account: AccountEntity) {
    let issue = await this.issueConnection.findOne({
      id: id,
    });
    if (issue !== undefined) {
      issue.account = account;
      issue.accountId = accountId;
      return await this.issueConnection.manager.save(issue);
    }
  }

  async setLabel(owner: string, repo: string, issueNumber: number, label: string, token: string) {
    const r = new Requestable({
      token: token,
    });
    const response = await r._request('POST', '/repos/' + owner + '/' + repo + '/issues/' + issueNumber + '/labels', {
      labels: [label],
    });
  }

  async removeLabel(owner: string, repo: string, issueNumber: number, label: string, token: string) {
    const r = new Requestable({
      token: token,
    });
    try {
      const response = await r._request(
        'DELETE',
        '/repos/' + owner + '/' + repo + '/issues/' + issueNumber + '/labels/' + label
      );
    } catch {
      console.log(
        'Error on remove label in ' + '/repos/' + owner + '/' + repo + '/issues/' + issueNumber + '/labels/' + label
      );
    }
  }

  async removeAccount(accountId: number, accountLabel: string, token: string) {
    let issues = await this.issueConnection.find({
      accountId: accountId,
    });
    issues.forEach(async (issue) => {
      if (issue !== undefined) {
        issue.accountId = null;
        await this.issueConnection.manager.save(issue);

        // remove label from github
        this.removeLabel(issue.owner, issue.repo, issue.number, accountLabel, token);
      }
    });
  }

  async findIssueById(numberId: number): Promise<IssueEntity | undefined> {
    return await this.issueConnection.findOne({
      id: numberId,
    });
  }

  async findIssuesById(issuesIds: number[]) {
    return await this.issueConnection.findByIds(issuesIds);
  }

  async getAllIssues(): Promise<IssueEntity[]> {
    const filter = await this.collaboratorController.getFilterByCollaborator('assignedToId');
    return await this.issueConnection.find({
      where: { ...filter, accountId: null },
      relations: ['assignedTo', 'project', 'repository', 'account'],
      order: { id: 'DESC' },
    });
  }

  async getIssuesFromAccount(accountId: number): Promise<IssueEntity[]> {
    return await this.issueConnection.find({
      where: { accountId: accountId },
      relations: ['assignedTo', 'project', 'repository', 'account'],
    });
  }

  async getStats(idCollaborator: number) {
    const query = await this.issueConnection
      .createQueryBuilder('iss')
      .select("date_part('week', iss.closed_at::date)", 'week_number')
      .addSelect("date_trunc('week', iss.closed_at::date)", 'weekly')
      .addSelect('COUNT(iss.id)', 'count_task')
      .addSelect('SUM(iss.hours)', 'hours')
      .addSelect('SUM(iss.hours)/5', 'average')
      .where('iss.assignedToId = :id', { id: idCollaborator })
      .groupBy('week_number, weekly')
      .orderBy('weekly');

    const statsWeek = await query.getRawMany();

    return statsWeek.map((item: any) => {
      return item;
    });
  }
}
