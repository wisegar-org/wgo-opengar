import { AuthorizeUserRol, RolEntityEnum } from '@wisegar-org/wgo-opengar-core';
import { Express } from 'express';
import { Connection } from 'typeorm';
import { IssueService, LabelService, MilestoneService, ProjectService, UpdateIssuesService } from '../services';
import { RepositoryService } from '../services/RepositoryService';

const token: string = process.env.API_TOKEN;

export const GithubController = (app: Express, conn: Connection) => {
  app.get('/api/issues', AuthorizeUserRol([RolEntityEnum.admin, RolEntityEnum.user]), async (req, res) => {
    const issuesService = new IssueService(req.context);
    const result = { issues: await issuesService.getAllIssues() };
    res.send(result);
  });

  app.get('/api/issues/account/:id', AuthorizeUserRol(), async (req, res) => {
    const issuesService = new IssueService(req.context);
    const result = {
      issues: await issuesService.getIssuesFromAccount(parseInt(req.params.id)),
    };
    res.send(result);
  });

  app.get('/api/milestones', AuthorizeUserRol(), async (req, res) => {
    const milestoneService = new MilestoneService();
    const result = { milestones: await milestoneService.getAllMilestones() };
    res.send(result);
  });

  app.get('/api/labels', AuthorizeUserRol(), async (req, res) => {
    const labelService = new LabelService();
    const result = { labels: await labelService.getAllLabels() };
    res.send(result);
  });

  app.get('/api/projects', AuthorizeUserRol(), async (req, res) => {
    const projService = new ProjectService();
    const result = { projects: await projService.getAllProject() };
    res.send(result);
  });

  app.get('/api/repositories', AuthorizeUserRol(), async (req, res) => {
    const repoService = new RepositoryService();
    const result = { repositories: await repoService.getAllRepository() };
    res.send(result);
  });

  app.get('/api/update', async (req, res) => {
    const updateIssuesService = new UpdateIssuesService();
    await updateIssuesService.Update(token);
    res.send({ message: 'Updated!', update: true });
  });

  app.post('/api/payload', async (req, res) => {
    const updateIssuesService = new UpdateIssuesService();
    const { issue, comment, repository } = req.body;
    console.log(issue);
    console.log(comment);
    console.log(repository);
    await updateIssuesService.SingleUpdate(token, issue, comment, repository);
    res.send({ message: 'Updated!', update: true });
  });

  app.get('/api/getStats', AuthorizeUserRol(), async (req, res) => {
    const issuesService = new IssueService();
    const { idCollaborator } = req.query;
    const stats = await issuesService.getStats(parseInt(idCollaborator as string));
    res.send({ stats });
  });
};
