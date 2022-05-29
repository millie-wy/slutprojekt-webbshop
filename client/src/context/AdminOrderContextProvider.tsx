import type { Order } from "@server/shared/client.types";
import { createContext, FC, useCallback, useContext, useState } from "react";
import { makeRequest } from "../Helper";

interface AdminOrderContextValues {
  isLoading: boolean;
  orders: Order[];
  fetchAllOrders: () => void;
  //countProductQuantity: (orders) => void;
}

export const AdminOrderContext = createContext<AdminOrderContextValues>({
  isLoading: true,
  orders: [],
  fetchAllOrders: () => {},
  //countProductQuantity: (orders) => {},
});

const AdminOrderProvider: FC = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  /** fetching all orders */
  const fetchAllOrders = useCallback(async () => {
    let response = await makeRequest("api/order", "GET");
    setOrders(response);
    setIsLoading(false);
  }, []);

  return (
    <AdminOrderContext.Provider
      value={{
        isLoading,
        fetchAllOrders,
        //countProductQuantity,
        orders,
      }}
    >
      {props.children}
    </AdminOrderContext.Provider>
  );
};

export default AdminOrderProvider;
export const useAdminOrder = () => useContext(AdminOrderContext);
