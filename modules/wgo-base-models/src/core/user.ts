export interface IUser {
  id: number;
  name: string;
  lastName: string;
  userName: string;
  email: string;
  isEmailConfirmed: boolean;
  roles: string[];
  code: string;
  cap: string;
  address: string;
  certificate: string;
}
