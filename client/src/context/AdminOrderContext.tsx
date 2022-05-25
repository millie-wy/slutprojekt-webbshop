import { createContext, FC, useCallback, useContext, useState } from "react";
import { makeRequest } from "../Helper";
import type { Order } from "@server/shared/client.types" 

interface AdminOrderContextValues {
  orders: Order[];
  fetchAllOrders: () => void;
  //countProductQuantity: (orders) => void;
}

export const AdminOrderContext = createContext<AdminOrderContextValues>({
  orders: [],
  fetchAllOrders: () => {},
  //countProductQuantity: (orders) => {},
});

const AdminOrderProvider: FC = (props) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [productQuantity, setProductQuantity] = useState()

  /** fetching all orders */
  const fetchAllOrders = useCallback(async () => {
    let response = await makeRequest("api/order", "GET");
    setOrders(response);
  }, []);

  /** function to count the amount of products in each order */
  /* const countProductQuantity = (orders) => {
    const order: Order = orders.map()
    let productAmount = order.products;
    console.log(productAmount);
    
    let counter = 0;
    for( let i = 0; i < productAmount.length; i++ ) {
      if (productAmount[i] === 0 ) counter ++;
    }
    console.log(counter);
    
  } */

  return (
    <AdminOrderContext.Provider value={{
        fetchAllOrders,
        //countProductQuantity,
        orders,
    }}>
      {props.children}
    </AdminOrderContext.Provider>
  );
};

export default AdminOrderProvider;
export const useAdminOrder = () => useContext(AdminOrderContext);
