import InventoryType from './InventoryType';
import UserType from './UserType';

export default interface OrderType {
  _id: string;
  merchant: UserType; // this is the merchant that the order belongs to
  agent: UserType; // this is the agent that the merchant belongs to
  transactionId: string;
  orderInformation: {
    subTotal: number;
    total: number;
    tax?: number;
    shipping?: number;
    fee?: number;
    currency?: string; //last 4 digits of the card used
    last4?: string;
  };
  status?: string;
  orderNumber?: string;
  shipped?: boolean;
  shippedDate?: Date;
  trackingNumber?: string;
  orderType?: string;
  customer: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  items?: [
    { product: InventoryType; quantity: number; price: number; total: number }
  ];
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
  };
  billingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
  };
  paymentProcessor: string;
  createdAt: Date;
  updatedAt: Date;
}
