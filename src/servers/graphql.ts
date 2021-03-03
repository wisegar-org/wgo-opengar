import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Service } from "typedi";
import { Session } from "../database/entities/Session";
import { UserResolver } from "../graphql/resolvers/UserResolver";
import { authChecker, Context, formatError, IContextUser } from '../graphql/types/graphql-utils';
import { verifyAccessToken } from "../services/jwtToken";
import { RoleResolver } from '../graphql/resolvers/RoleResolver';
import { ClientResolver } from '../graphql/resolvers/ClientResolver';
import {Container}from 'typedi'

@Service()
export class GraphQlServer {
  static bootGraphql = async (app: any) => {
    const schema = await buildSchema({
      resolvers: [UserResolver, RoleResolver,ClientResolver],
      authChecker: authChecker,
      authMode: "null",
      container: Container,
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
            user = <IContextUser>{ userId: session.userId, email: session.email, roles: session.roles, extra: session.extra };
          }
        }
        const ctx: Context = {
          user: user,
        };
        return ctx;
      },
      playground: true
    });

    server.applyMiddleware({ app });

    console.log(server.graphqlPath);
  }
}






