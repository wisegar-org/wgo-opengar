import { AppResolver } from './AppResolver';
import { EmailResolver } from './EmailResolver';
import { MediaResolver } from './MediaResolver';
import { RoleResolver } from './RoleResolver';
import { UserResolver } from './UserResolver';

export const getWGOResolvers = () => {
  return [AppResolver, EmailResolver, MediaResolver, RoleResolver, UserResolver];
};
