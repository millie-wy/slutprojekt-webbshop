import { ChangeEvent, createContext, FC, useContext, useState } from "react";
import { makeRequest } from "../Helper";
import type { Product } from "@server/shared/client.types";
interface ProductContextValue {
  products: Product[];
  fetchAllProducts: () => void;
  isLoading: boolean;
  handleCategoryChange: (e) => void;
  filteredProducts: Product[];
}

export const ProductContext = createContext<ProductContextValue>({
  fetchAllProducts: () => {},
  isLoading: true,
  handleCategoryChange: () => {},
  products: [],
  filteredProducts: [],
});

const ProductProvider: FC = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const fetchAllProducts = async () => {
    let response = await makeRequest("/api/product", "GET");
    setProducts(response);
    setFilteredProducts(response);
    setIsLoading(false);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLLIElement>) => {
    const target = e.target.innerText.trim();
    target !== "All" ? filterProducts(target) : setFilteredProducts(products);
  };

  const filterProducts = (category: string) => {
    // check if the product category array has the value of the argument "category"
    const filter = products.filter(
      (product) => product.category.indexOf(category) !== -1
    );
    setFilteredProducts(filter);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        fetchAllProducts,
        filteredProducts,
        isLoading,
        handleCategoryChange,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
export const useProduct = () => useContext(ProductContext);
