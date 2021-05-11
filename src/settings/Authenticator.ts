import { AuthError, Context, ContextUser } from '@wisegar-org/wgo-opengar-core';
import { AuthChecker } from 'type-graphql';

const isSuperAdmin = (user: ContextUser) => {
  return user && user.roles && user.roles.includes('ADMIN');
};

const isInvalidUser = (user: ContextUser) => {
  return !user || user === null;
};
export const Authenticate: AuthChecker<Context> = ({ context: { user } }, roles) => {
  if (isInvalidUser(user)) {
    throw new Error(AuthError.NotAuthorized);
  }

  if (isSuperAdmin(user)) return true;

  if (roles.length === 0) {
    if (user !== undefined) return true;
    throw new Error(AuthError.NotAuthorized);
  }

  // TODO: Revisar que el usuario tenga el role que se pide

  throw new Error(AuthError.NotAuthorized);
};
