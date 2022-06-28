import { IRole } from './IRole';

export interface IUser {
  name: string;
  email: string;
  roleId: string;
  password: string;
  address: string;
  streetNumber: string;
  city: string;
  country: string;
  phoneNumber: string;
  sponsorshipCode: string;
}
