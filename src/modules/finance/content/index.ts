import { Connection } from 'typeorm';
import CollaboratorEntity from '../database/entities/CollaboratorEntity';
import { GetPublicPathKey, GetPublicReportPath } from '../services/SettingsService';
import { existsSync, mkdirpSync } from 'fs-extra';

export async function CheckCollaboratosId(conn: Connection) {
  const collaboratorConnection = conn.getRepository(CollaboratorEntity);

  const collaborators = await collaboratorConnection.find({
    where: {
      isCollaborator: true,
    },
  });

  await Promise.all(
    collaborators.map(async (coll) => {
      if (coll.id_github === 0) {
        coll.id_github = coll.id;
        await collaboratorConnection.manager.save(coll);
      }
    })
  );

  return true;
}

export function exportPublicPaths() {
  const publicPath = GetPublicPathKey();
  if (!existsSync(publicPath)) {
    mkdirpSync(publicPath);
    console.log('Create public folder');
  }
  const publicReportPath = GetPublicReportPath();
  if (!existsSync(publicReportPath)) {
    mkdirpSync(publicReportPath);
    console.log('Create public folder');
  }
}
