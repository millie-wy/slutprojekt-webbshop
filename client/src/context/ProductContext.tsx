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
  getFilteredList: () => void;
}

export const ProductContext = createContext<ProductContextValue>({
  fetchProducts: () => {},
  filteredList: [],
  isLoading: false,
  handleCategoryChange: (e) => {},
  products: [],
  getFilteredList: () => {},
});

const ProductProvider: FC = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState();
  // TODO: SET PRODUCTS TO CORRECT PRODUCTDATA

  const fetchProducts = async (products: Product) => {
    let response = await makeRequest("/api/product", "GET");
    setProducts(response);
    setIsLoading(false);
    // fetchData();
  };

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
    getFilteredList();
    console.log(selectedCategory);
  }

  function getFilteredList() {
    if (!selectedCategory) {
      return products;
    }
    console.log("getFilteredList");
    return products.filter((product) => product.category === selectedCategory);
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
        getFilteredList,
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
