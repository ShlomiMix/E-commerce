import { useOrders } from "../../hooks/OrdersHooks/useOrders";
import "./Orders.css";

export function Orders(): JSX.Element {
  const { orders } = useOrders();

  return (
    <div className="orders-container grid gap-6 p-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {orders?.map((order) => (
        <div
          className="order-card  bg-white dark:bg-gray-800 border-2 border-gray-500 dark:border-gray-700 rounded-xl shadow-lg"
          key={order._id}
        >
          <div className="p-6">
            <div className="mb-4 flex flex-col gap-y-3">
              <h4 className="text-md font-medium text-slate-900 dark:text-white">
                Order status: {order.orderDetails.orderStatus}
              </h4>
              <p className="text-md font-medium text-slate-900 dark:text-white">
                Order Date: {order.orderDetails.orderDate.substring(0, 24)}
              </p>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {order.items.map((item, index) => (
                <div key={index} className="py-2">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {item.name}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Color: {item.color}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Size: {item.size}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-y-3 justify-center items-center">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Total: ${order?.transactionDetails?.total}
              </p>

              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Expected Delivery: {order?.orderDetails?.expectedDeliveryDate}{" "}
                days
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
