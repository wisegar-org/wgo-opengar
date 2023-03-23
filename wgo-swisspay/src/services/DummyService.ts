import { IsNullOrUndefined } from '@wisegar-org/wgo-object-extensions';
import { PostgresDataSource } from '../dataSources';
import { EmailHistoryEntity } from '../database/entities/EmailHistoryEntity';

export const AddEmailRecord = async () => {
  const emailRepository = PostgresDataSource.getRepository(EmailHistoryEntity);
  const dummyEmail = new EmailHistoryEntity();
  dummyEmail.from = 'yariel.re@gmail.com';
  dummyEmail.date = new Date();
  dummyEmail.text = `Hola a las ${Date.now}`;
  const emailRegistered = await emailRepository.save(dummyEmail);
  if (!IsNullOrUndefined(emailRegistered)) console.log(`New email registered at ${Date.now}`);

  return emailRegistered;
};
