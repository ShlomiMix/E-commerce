export type Customer = {
  userId:string;  
  email: string;
  firstName: string;
  lastName: string;
};

export type ShippingDetails = {
  address?: string;
  apartment?: string;
  city?: string;
  country?: string;
  state?: string;
  postalCode?: string;
  phone?: string;
};

export type OrderDetails = {
  shippingMethod: string;
  orderStatus: string;
  orderDate: string;
  expectedDeliveryDate: string;
};

export type CustomerCard = {
  paymentMethod: string;
  cardNumber: string;
  nameOnCard: string;
  expirationDate: string;
  cvv: number;
};
export type Items = {
  productId: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  stockId: string;
};

export type CartProduct = {
  productId: string;
  product: {
    _id: string;
    name: string;
    price: string;
    stock: {
      color: { name: string };
      size: { name: string };
      quantity: number;
    }[];
  };
  amount: number;
};

export type TransactionDetails = {
  subTotal: number;
  taxes: number;
  total: number;
};

export class OrderModel {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  shippingMethod: string;
  orderStatus: string;
  orderDate: string;
  expectedDeliveryDate: string;
  paymentMethod: string;
  cardNumber: string;
  nameOnCard: string;
  expirationDate: string;
  cvc: number;
  productId: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  taxes: number;
  subTotal: number;
  customer: Customer;
  shippingDetails: ShippingDetails;
  orderDetails: OrderDetails;
  customerCard: CustomerCard;
  items: Items[];
  transactionDetails: TransactionDetails;
}
