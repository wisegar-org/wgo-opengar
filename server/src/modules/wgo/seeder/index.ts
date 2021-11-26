import { GetConnection } from '../database';
import { DataSeeder } from './Seeder';

export const SeederWGO = async () => {
  const connection = GetConnection();
  const seeder = new DataSeeder(connection);
  await seeder.createData();
};
