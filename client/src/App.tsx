import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminOrderTable from "./components/Admin/adminOrders/AdminOrdersTable";
import AdminProductsTable from "./components/Admin/adminProducts/AdminProductsTable";
import CheckoutPage from "./components/cart-checkout/CheckoutPage";
import OrderConfirmation from "./components/cart-checkout/OrderConfirmation";
import DetailPage from "./components/DetailPage";
import Layout from "./components/Layout";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import ProductPage from "./components/ProductPage";
import EmptyPage from "./components/shared/EmptyPage";
import Signup from "./components/Signup";
import StartPage from "./components/StartPage";
import AdminOrderProvider from "./context/AdminOrderContextProvider";
import AdminProductProvider from "./context/AdminProductContextProvider";
import CartProvider from "./context/CartContextProvider";
import ErrorProvider from "./context/ErrorContextProvider";
import OrderProvider from "./context/OrderContextProvider";
import ProductProvider from "./context/ProductContextProvider";
import UserProvider from "./context/UserContextProvider";

function App() {
  return (
    <BrowserRouter>
      <ErrorProvider>
        <ProductProvider>
          <AdminProductProvider>
            <AdminOrderProvider>
              <CartProvider>
                <OrderProvider>
                  <UserProvider>
                    <Routes>
                      <Route path="/" element={<Layout />}>
                        <Route index element={<StartPage />} />
                        <Route path="/furniture" element={<ProductPage />} />
                        <Route
                          path="/textiles"
                          element={<EmptyPage page="Textiles" />}
                        />
                        <Route
                          path="/lighting"
                          element={<EmptyPage page="Lighting" />}
                        />
                        <Route
                          path="/decoration"
                          element={<EmptyPage page="Decoration" />}
                        />
                        <Route
                          path="/inspiration"
                          element={<EmptyPage page="Inspiration" />}
                        />
                        <Route path="/detail/:id" element={<DetailPage />} />
                        <Route
                          path="/confirmation"
                          element={<OrderConfirmation />}
                        />
                        <Route
                          path="/admin-orders"
                          element={<AdminOrderTable />}
                        />
                        <Route
                          path="/admin-products"
                          element={<AdminProductsTable />}
                        />
                        <Route
                          path="/checkoutpage"
                          element={<CheckoutPage />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="*" element={<NotFound />} />
                      </Route>
                    </Routes>
                  </UserProvider>
                </OrderProvider>
              </CartProvider>
            </AdminOrderProvider>
          </AdminProductProvider>
        </ProductProvider>
      </ErrorProvider>
    </BrowserRouter>
  );
}

export default App;
