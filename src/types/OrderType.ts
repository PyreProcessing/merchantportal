export default interface OrderType {
  _id: string;
  merchant: string;
  agent: string; // this is the agent that the merchant belongs to
  transactionId?: string;
  amount: number;
  currency?: string;
  status: string;
  orderNumber?: string;
  shipped?: boolean;
  shippedDate: Date;
  trackingNumber: string;
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
}
