"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQlServer = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const wgo_opengar_core_1 = require("@wisegar-org/wgo-opengar-core");
const UserResolver_1 = require("../graphql/resolvers/UserResolver");
const graphql_utils_1 = require("../graphql/types/graphql-utils");
const jwtToken_1 = require("../services/jwtToken");
const RoleResolver_1 = require("../graphql/resolvers/RoleResolver");
const ClientResolver_1 = require("../graphql/resolvers/ClientResolver");
const typedi_2 = require("typedi");
let GraphQlServer = class GraphQlServer {
};
GraphQlServer.bootGraphql = async (app) => {
    const schema = await type_graphql_1.buildSchema({
        resolvers: [UserResolver_1.UserResolver, RoleResolver_1.RoleResolver, ClientResolver_1.ClientResolver],
        authChecker: graphql_utils_1.authChecker,
        authMode: "null",
        container: typedi_2.Container,
    });
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        formatError: graphql_utils_1.formatError,
        context: async ({ req, res }) => {
            let user = undefined;
            const token = req.headers.authorization || "";
            console.log("TOKEN ", token);
            const data = jwtToken_1.verifyAccessToken(res, token);
            if (data) {
                const session = await wgo_opengar_core_1.Session.findOne({ uuid: data.session });
                if (session) {
                    user = {
                        userId: session.userId,
                        email: session.email,
                        roles: session.roles,
                        extra: session.extra,
                    };
                }
            }
            const ctx = {
                user: user,
            };
            return ctx;
        },
        playground: true,
    });
    server.applyMiddleware({ app });
    console.log(server.graphqlPath);
};
GraphQlServer = __decorate([
    typedi_1.Service()
], GraphQlServer);
exports.GraphQlServer = GraphQlServer;
//# sourceMappingURL=graphql.js.map