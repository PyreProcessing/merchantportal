import CustomerType from './CustomerType';
import UserType from './UserType';

export interface VaultType {
  merchant: UserType;
  customer: CustomerType;
  nmiCustomerVaultId: string;
  creditCardDetails?: {
    last4?: string;
    ccnumber?: string;
    ccexp?: string;
  };
  achDetails?: {
    checkname?: string;
    checkaba?: string;
    checkaccount?: string;
    account_holder_type?: string;
    account_type?: string;
    checkaccountLast4?: string;
  };
  billingAddress?: {
    name?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
  };
  paymentMethod?: string;
}
