import type { Order } from "@server/shared/client.types";
import { createContext, FC, useCallback, useContext, useState } from "react";
import { makeRequest } from "../Helper";
import { useError } from "./ErrorContextProvider";

interface AdminOrderContextValues {
  isLoading: boolean;
  orders: Order[];
  fetchAllOrders: () => void;
}

export const AdminOrderContext = createContext<AdminOrderContextValues>({
  isLoading: true,
  orders: [],
  fetchAllOrders: () => {},
});

const AdminOrderProvider: FC = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const { setError } = useError();

  /** fetching all orders */
  const fetchAllOrders = useCallback(async () => {
    let response = await makeRequest("api/order", "GET");
    if (!response.ok) {
      setError(response.result);
    } else {
      setOrders(response.result);
      setIsLoading(false);
    }
  }, [setError]);

  return (
    <AdminOrderContext.Provider
      value={{
        isLoading,
        fetchAllOrders,
        orders,
      }}
    >
      {props.children}
    </AdminOrderContext.Provider>
  );
};

export default AdminOrderProvider;
export const useAdminOrder = () => useContext(AdminOrderContext);
