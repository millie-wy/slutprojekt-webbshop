import { createContext, FC, useContext, useState } from "react";
import { makeRequest } from "../Helper";
import type { Order } from "@server/shared/client.types" 

interface AdminOrderContextValues {
  orders: Order[];
  fetchAllOrders: () => void;
}

export const AdminOrderContext = createContext<AdminOrderContextValues>({
  orders: [],
  fetchAllOrders: () => {},
});

const AdminOrderProvider: FC = (props) => {
  const [orders, setOrders] = useState<Order[]>([]);

  /** fetching all orders */
  const fetchAllOrders = async () => {
    let response = await makeRequest("api/order", "GET");
    setOrders(response);
    console.log(orders);
  };

  return (
    <AdminOrderContext.Provider value={{
        fetchAllOrders,
        orders,
    }}>
      {props.children}
    </AdminOrderContext.Provider>
  );
};

export default AdminOrderProvider;
export const useAdminOrder = () => useContext(AdminOrderContext);
