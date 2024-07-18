import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { OrderModel, TransactionDetails } from "../../../Models/OrderModel";
import { resetCart } from "../../../Redux/CartSlice";
import {
    AppDispatch,
    useAppSelector
} from "../../../Redux/Store";
import { ordersService } from "../../../Services/OrderService";
import { notify } from "../../../Utils/Notify";

export const usePaymentCheckout = () => {
  const userId = useAppSelector((state) => state?.auth?._id);
  const methods = useForm<OrderModel>();
  const cart = useAppSelector((state) => state?.cart?.products);
  const dispatch: AppDispatch = useDispatch();

  const { handleSubmit, watch } = methods;

  const subTotal = Object.values(cart).reduce((acc, currentValue) => {
    const productTotal = currentValue.amount * currentValue.product.price;
    console.log("ProductTotal", productTotal);

    return acc + productTotal;
  }, 0);

  const taxes = +(subTotal * 0.17).toFixed(2);
  const shippingMethod = watch("orderDetails.shippingMethod");
  const shippingCost = shippingMethod === "express" ? 30 : 10;
  const totalPrice = subTotal + taxes + shippingCost;

  async function addOrder(order: OrderModel): Promise<void> {
    try {
      if (userId) {
        order.customer.userId = userId;
      }
      const expectedDeliveryDate = shippingMethod === "express" ? "5" : "14";
      order.orderDetails.expectedDeliveryDate = expectedDeliveryDate;

      order.orderDetails.orderDate = new Date().toString();
      const expirationDate = new Date(order.customerCard.expirationDate);
      const formattedDate = `${(expirationDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${expirationDate.getFullYear()}`;

      order.customerCard.expirationDate = formattedDate;

      if (!order.transactionDetails) {
        order.transactionDetails = {} as TransactionDetails;
      }

      order.transactionDetails.subTotal = subTotal;
      order.transactionDetails.taxes = taxes;
      order.transactionDetails.total = totalPrice;

      const products = Object.values(cart).map((cartProduct) => ({
        productId: cartProduct.product._id,
        name: cartProduct.product.name,
        color: cartProduct.product.stock
          .map((stock) => stock?.color?.name)
          .join(", "),
        size: cartProduct.product.stock
          .map((stock) => stock?.size?.name)
          .join(", "),
        quantity: cartProduct.amount,
        price: cartProduct.product.price * cartProduct.amount,
        stockId: cartProduct.stockId,
      }));
      order.items = products;

      order.orderDetails.orderStatus = "Order placed";
      await ordersService.addOrder(order);
      notify.success("Order placed");
      dispatch(resetCart());
    } catch (err: any) {
      notify.error(err);
    }
  }

  return {
    methods,
    handleSubmit,
    addOrder,
  };
};
