import { GetConnection } from '../../wgo/database';
import { AddAdminUserSeeder } from './AddAdminUserSeeder';
import { EventsSeeder } from './EventsSeeder';

export const SeederAGV = async () => {
  const connection = GetConnection();
  await AddAdminUserSeeder(connection);
  await EventsSeeder(connection);
};
