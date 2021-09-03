import { DBConector } from '../../../database/DBConector';
import { AddAdminUserSeeder } from './AddAdminUserSeeder';
import { EventsSeeder } from './EventsSeeder';

export const SedderAGV = async () => {
  const connection = DBConector.GetConnection();
  await AddAdminUserSeeder(connection);
  await EventsSeeder(connection);
};
