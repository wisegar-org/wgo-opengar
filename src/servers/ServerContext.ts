import { AccessTokenData, Context, GetNodeEnvKey, UserEntity } from '@wisegar-org/wgo-opengar-core';
import { Connection } from 'typeorm';

const environment = GetNodeEnvKey();

export const ServerContext = (connection: Connection) => {
  return async (payload: AccessTokenData) => {
    const ctx: Context = {
      user: null,
    };
    if (!payload) return ctx;
    try {
      if (environment === 'development') {
        console.log(payload);
      }
      const user: UserEntity = await connection.getRepository(UserEntity).findOne({
        where: { id: payload.userId },
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
        // language: user.language
      };
    } catch (error) {
      throw error;
    }
    return ctx;
  };
};
