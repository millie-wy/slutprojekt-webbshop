import {
  ChangeEvent,
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from "react";
import { makeRequest } from "../Helper";
import type { Product } from "@server/shared/client.types";
import { useError } from "./ErrorContextProvider";
interface ProductContextValue {
  products: Product[];
  product: Product;
  fetchAllProducts: () => Promise<unknown>;
  fetchProduct: (product_Id: string) => Promise<unknown>;
  isLoading: boolean;
  handleCategoryChange: (e) => void;
  filteredProducts: Product[];
}

export const ProductContext = createContext<ProductContextValue>({
  products: [],
  product: {
    title: "",
    description: "",
    category: "",
    price: 0,
  },
  fetchAllProducts: () => Promise.resolve(),
  fetchProduct: () => Promise.resolve(),
  isLoading: true,
  handleCategoryChange: () => {},
  filteredProducts: [],
});

const ProductProvider: FC = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>({
    title: "",
    description: "",
    category: "",
    price: 0,
  });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const { setError } = useError();

  const fetchAllProducts = useCallback(async () => {
    let response = await makeRequest("/api/product", "GET");
    if (!response.ok) {
      setError(response.result);
    } else {
      setProducts(response.result);
      setFilteredProducts(response.result);
      setIsLoading(false);
    }
  }, [setError]);

  // get a specific product by id
  const fetchProduct = useCallback(
    async (product_Id: string) => {
      const response = await makeRequest(`/api/product/${product_Id}`, "GET");
      if (!response.ok) {
        setError(response.result);
      } else {
        setProduct(response.result);
        setIsLoading(false);
      }
    },
    [setError]
  );

  // filter product based on the category clicked
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
        product,
        products,
        fetchAllProducts,
        fetchProduct,
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
