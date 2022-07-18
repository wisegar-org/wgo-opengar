import { UserResponse } from '../resolvers/Auth/AuthResponses';

export interface IEmployeeModel {
  id: number;
  name: string;
  email: string;
  enterprise_id: UserResponse;
  client_id: UserResponse;
}

export interface IUserFilter {
  id: number;
}

export interface IEmployeeFilter {
  enterprise_id: IUserFilter;
}
