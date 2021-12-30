import { Express } from 'express';
import { Connection } from 'typeorm';
import { AuthorizeUserRol, RolEntityEnum } from '@wisegar-org/wgo-opengar-core';
import { OrganizationDataService } from '../services';
export const OrganizationController = (app: Express, conn: Connection) => {
  app.get('/api/organizationData', AuthorizeUserRol([RolEntityEnum.admin, RolEntityEnum.user]), async (req, res) => {
    const organizationDataService = new OrganizationDataService();
    const organizationData = await organizationDataService.getOrganizationData();
    res.send({ organizationData: organizationData });
  });

  app.post('/api/setOrganizationData', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const organizationDataService = new OrganizationDataService();

    const updated = await organizationDataService.setOrganizationData(req.body);

    res.send({ update: !!updated, organizationData: updated });
  });
};
