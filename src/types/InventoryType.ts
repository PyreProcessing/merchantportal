export default interface InventoryType {
  _id: string;
  merchant: string;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  inventoryAlert?: number;
  // field for unlimited stock, stock never runs out, used mainly for digital products
  unlimitedStock?: boolean;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
  SKU?: string;
  category?: string[];
  manufacturer?: string;
  model?: string;
  weight?: string;
  dimensions?: string;
  metaKeywords?: string[];
  metaDescription?: string;
  metaTitle?: string;
  outOfStock?: boolean;
  requiresShipping?: boolean;
  shippingFee?: number;
  tax?: number;
  taxable?: boolean;
}
