import { useEffect, useState } from "react";
import { useAppSelector } from "../../../Redux/Store";
import { OrderModel } from "../../../Models/OrderModel";
import { ordersService } from "../../../Services/OrderService";
import { notify } from "../../../Utils/Notify";

export const useOrders = () => {
  const userId = useAppSelector((state) => state?.auth?._id);
  const [orders, setOrders] = useState<OrderModel[]>([]);

  useEffect(() => {
    if (userId) {
      ordersService
        .getAllOrdersByUserId(userId)
        .then((orders) => setOrders(orders))
        .catch((err) => notify.error(err));
    }
  }, [userId]);

  return {
    userId,
    orders,
  };
};
