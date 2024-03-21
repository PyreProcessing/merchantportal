import InventoryType from "./InventoryType";

export default interface OrderType {
  _id: string;
  merchant: string;
  agent: string; // this is the agent that the merchant belongs to
  transactionId?: string;
  orderInformation: {
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

  createdAt: Date;
  updatedAt: Date;
}
