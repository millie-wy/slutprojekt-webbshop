import type { Product } from "@server/shared/client.types";
import { createContext, FC, useContext, useState } from "react";

interface AdminProductContextValue {
  // products: Product[];
  isEdit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  saveProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
}

export const AdminProductContext = createContext<AdminProductContextValue>({
  // products: [],
  isEdit: false,
  addProduct: () => {},
  setEdit: () => {},
  saveProduct: () => {},
  removeProduct: () => {},
});

// COMMENT BY MILLIE: this file has loads of error after updating the import (client.types), so most of the functions have been commented out
// reminder: the full product list is in the "product" state under ProductContext so hopefully no need to fetch again here

const AdminProductProvider: FC = (props) => {
  // COMMENT BY MILLIE: commented out the below state as the product data was the local data which does not exist anymore
  // const [products, setProducts] = useLocalStorageState(productData, "adminLS");
  const [isEdit, setEdit] = useState(false);

  // function that pushes new product to a new list and then updates LS

  const addProduct = (newProduct: Product) => {
    // COMMENT BY MILLIE: this part should be replaced with POST
    // let newProductList = [...products];
    // newProductList.push(newProduct);
    // setProducts(newProductList);
  };

  // function that removes a product, makes a new list and updates LS
  const removeProduct = (productToBeRemoved: Product) => {
    // COMMENT BY MILLIE: this part should be replaced with DELETE
    // const updatedProductList = products.filter(
    //   (product) => productToBeRemoved.id !== product.id
    // );
    // setProducts(updatedProductList);
  };

  // update a product
  const saveProduct = (editedProduct: Product) => {
    // COMMENT BY MILLIE: this part should be replaced with PUT
    // const productExists = products.find((item) => item.id === editedProduct.id);
    // if (productExists) {
    //   setProducts(
    //     products.map((item) =>
    //       item.id === editedProduct.id ? { ...editedProduct } : item
    //     )
    //   );
    // } else {
    //   setProducts([...products, editedProduct]);
    // }
  };

  // makes a new list that contains the edited product, sets edit to false
  // COMMENT BY MILLIE: dunno what this is but commented out to get rid of errors
  //   const editedProductList = products.map((item) => {
  //     if (editedProduct.id === item.id) {
  //       return editedProduct;
  //     }
  //     return item;
  //   });
  //   setProducts(editedProductList);
  //   setEdit(false);
  // };

  return (
    <AdminProductContext.Provider
      value={{
        // products,
        isEdit,
        setEdit,
        addProduct,
        saveProduct,
        removeProduct,
      }}
    >
      {props.children}
    </AdminProductContext.Provider>
  );
};

export default AdminProductProvider;
export const useAdminProduct = () => useContext(AdminProductContext);
