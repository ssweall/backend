import { IRole } from './IRole';

export interface IUser {
  name: string;
  email: string;
  roleId: string;
  password: string;
  address: string;
}
