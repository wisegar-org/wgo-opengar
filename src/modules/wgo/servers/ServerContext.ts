import { Context, GetNodeEnvKey, IContextOptions, UserEntity } from '@wisegar-org/wgo-opengar-core';
import { GetConnection } from '../database';

const environment = GetNodeEnvKey();

export const ServerContext = async (options: IContextOptions) => {
  if (!options) return;
  const { tokenPayload, requestHeaders } = options;
  const ctx: Context = {
    user: null,
  };
  if (!tokenPayload) return ctx;
  try {
    const connection = GetConnection();
    if (environment === 'development') {
      console.log(tokenPayload);
    }
    const user: UserEntity = await connection.getRepository(UserEntity).findOne({
      where: { id: tokenPayload.userId },
      relations: ['roles'],
    });
    if (!user) return ctx;
    ctx.user = {
      applicazioni: null,
      email: user.email,
      extra: null,
      permissions: null,
      roles: user.roles.map((role) => role.name),
      sessionId: '',
      userId: user.id.toString(),
      language: user.languageId,
    };
  } catch (error) {
    throw error;
  }
  return ctx;
};
