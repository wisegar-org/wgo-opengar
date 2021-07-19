import { AuthorizeUserRol, RolEntityEnum } from '@wisegar-org/wgo-opengar-core';
import { Express } from 'express';
import { Connection } from 'typeorm';
import { CollaboratorService } from '../services';
export const CollaboratorController = (app: Express, conn: Connection) => {
  app.get('/api/collaborators', AuthorizeUserRol(), async (req, res) => {
    const colService = new CollaboratorService(req.context);
    const result = { collaborators: await colService.getAllCollaborators() };
    res.send(result);
  });
  app.post('/api/addClient', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const collaboratorService = new CollaboratorService(req.context);
    const { name, bio, email, card_number, address } = req.body;

    const coll = await collaboratorService.addCollaborator(
      0,
      '',
      '',
      'client/provider',
      '',
      '',
      name,
      '',
      email,
      bio,
      false,
      card_number,
      address
    );
    res.send({ created: !!coll, collaborators: [coll] });
  });

  app.post(
    '/api/collUpdateAccInfo',
    AuthorizeUserRol([RolEntityEnum.superAdmin, RolEntityEnum.customer]),
    async (req, res) => {
      const colService = new CollaboratorService(req.context);
      const { id, name, card_number, pay_by_hours, pay_to_internet, email, address, bio } = req.body;

      const updated = await colService.updateAccountingInfo(
        id,
        name,
        card_number,
        pay_by_hours,
        pay_to_internet,
        email,
        address,
        bio
      );

      res.send({ update: !!updated, collaborators: [updated] });
    }
  );
};
