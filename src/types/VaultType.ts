import CustomerType from "./CustomerType";
import UserType from "./UserType";

export interface VaultType {
  merchant: UserType;
  customer: CustomerType;
  nmiCustomerVaultId: string;
  creditCardDetails: {
    last4: string;
    cardType: string;
    expirationDate: string;
  };
  achDetails: {
    accountType: string;
    accountHolderName: string;
    routingNumber: string;
    accountNumberLast4: string;
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
}
