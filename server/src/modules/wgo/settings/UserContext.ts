import { Context, ContextUser, SessionEntity, validateAccessToken } from '@wisegar-org/wgo-opengar-core';
import { getConnection } from 'typeorm';

export const GetContext = async ({ req, res }) => {
  let user = undefined;
  const token = req.headers.authorization || null;
  const ctx: Context = {
    user: null,
  };

  if (!token || token === 'null') {
    console.log('Error getting user context : undefined token ');
    return ctx;
  }

  let data = null;
  try {
    data = validateAccessToken(token);
  } catch (error) {
    console.log('Error getting user context : verifyAccessToken ', error);
    return ctx;
  }

  if (data) {
    try {
      const connection = getConnection();
      const sessionRepository = connection.getRepository(SessionEntity);
      const session = await sessionRepository.findOne({ id: data.sessionId });

      if (session) {
        ctx.user = <ContextUser>{
          sessionId: data.sessionId.toString(),
        };
      }
    } catch (error) {
      console.log('Getting user context error:  ', error);
    }
  }

  return ctx;
};
