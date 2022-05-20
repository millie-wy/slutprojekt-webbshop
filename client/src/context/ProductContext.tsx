import { createContext, FC, useContext, useMemo, useState } from "react";
import { useLocalStorageState } from "../components/hooks/useLocalStorageState";
import { makeRequest } from "../Helper";
import { Product } from "../Types";

interface ProductContextValue {
  products: Product[];
  fetchProducts: (products: Product) => void;
  filteredList: Product[];
  isLoading: boolean;
  handleCategoryChange: (e) => void;
}

export const ProductContext = createContext<ProductContextValue>({
  fetchProducts: () => {},
  filteredList: [],
  isLoading: false,
  handleCategoryChange: (e) => {},
  products: [],
});

const ProductProvider: FC = (props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState();
  const [productList, setProductList] = useState([]);

  // TODO: SET PRODUCTS TO CORRECT PRODUCTDATA

  const fetchProducts = async (products: Product) => {
    let response = await makeRequest("/api/product", "GET");
    setProducts(response);
    setIsLoading(false);
    // fetchData();
  };

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
  }

  function getFilteredList() {
    if (!selectedCategory) {
      return products;
    }
    return products.filter((item) => item.category === selectedCategory);
  }

  var filteredList = useMemo(getFilteredList, [selectedCategory, products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        fetchProducts,
        filteredList,
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

function fetchData() {
  throw new Error("Function not implemented.");
}
