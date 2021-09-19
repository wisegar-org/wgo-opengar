import { UserEntity } from '@wisegar-org/wgo-opengar-core';
export interface LoginModel {
  userName: string;
  password: string;
}

export interface UserLoginToken {
  token: string;
  user: UserEntity;
}
