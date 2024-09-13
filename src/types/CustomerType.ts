import UserType from './UserType';
import { VaultType } from './VaultType';
export default interface CustomerType {
  merchant: UserType;
  vault: VaultType;
  firstName: string;
  fullName: string;
  lastName: string;
  email: string;
  phone: string;
}
