import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Session } from '@wisegar-org/wgo-opengar-core';
import { UserResolver } from '../graphql/resolvers/UserResolver';
import { authChecker, Context, formatError, IContextUser } from '../graphql/types/graphql-utils';
import { verifyAccessToken } from '../services/jwtToken';
import { RoleResolver } from '../graphql/resolvers/RoleResolver';

export class GraphQlServer {
  static bootGraphql = async (app: any) => {
    const schema = await buildSchema({
      resolvers: [UserResolver, RoleResolver],
      authChecker: authChecker,
      authMode: 'null',
    });

    const server = new ApolloServer({
      schema,
      formatError,
      context: async ({ req, res }) => {
        let user = undefined;
        const token = req.headers.authorization || '';
        console.log('TOKEN ', token);
        const data = verifyAccessToken(res, token);
        if (data) {
          const session = await Session.findOne({ uuid: data.session });
          if (session) {
            user = <IContextUser>{
              userId: session.userId,
              email: session.email,
              roles: session.roles,
              extra: session.extra,
            };
          }
        }
        const ctx: Context = {
          user: user,
        };
        return ctx;
      },
      playground: true,
    });

    server.applyMiddleware({ app });

    console.log(server.graphqlPath);
  };
}
