import type { Product } from "@server/shared/client.types";
import { Types } from "mongoose";
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from "react";
import { makeRequest } from "../Helper";
import { useError } from "./ErrorContextProvider";
import { useProduct } from "./ProductContextProvider";

interface AdminProductContextValue {
  isEdit: boolean;
  isUploading: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  updateProduct: (updateObj: Product) => void;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  fileUpload: (file: any) => void;
  imageId: string | Types.ObjectId;
  setImageId: React.Dispatch<React.SetStateAction<string | Types.ObjectId>>;
}

export const AdminProductContext = createContext<AdminProductContextValue>({
  isEdit: false,
  isUploading: false,
  addProduct: () => {},
  setEdit: () => {},
  updateProduct: () => {},
  removeProduct: () => {},
  fileUpload: () => {},
  imageId: "",
  setImageId: () => {},
});

const AdminProductProvider: FC = (props) => {
  const { fetchAllProducts } = useProduct();
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [imageId, setImageId] = useState<string | Types.ObjectId>("");
  const { setError } = useError();

  // add a new product to the product collection in db
  const addProduct = useCallback(
    async (values: Product) => {
      if (!imageId) {
        setError("No image is attached");
        return;
      }

      const productObj = {
        title: values.title,
        description: values.description,
        price: values.price,
        stock: values.stock,
        category: values.category,
        imageId: imageId,
      };
      const response = await makeRequest("/api/product", "POST", productObj);
      if (!response.ok) {
        setError(response.result);
      } else {
        fetchAllProducts();
        setImageId("");
      }
    },
    [fetchAllProducts, imageId, setError]
  );

  // remove a product from product collection in db
  const removeProduct = useCallback(
    async (product: Product) => {
      const response = await makeRequest(
        `/api/product/${product._id}`,
        "DELETE"
      );
      if (!response.ok) {
        setError(response.result);
      } else {
        fetchAllProducts();
      }
    },
    [fetchAllProducts, setError]
  );

  // update a product in product collection in db
  const updateProduct = useCallback(
    async (updateObj) => {
      const productObj = {
        title: updateObj.title,
        description: updateObj.description,
        price: updateObj.price,
        stock: updateObj.stock,
        category: updateObj.category,
        imageId: !imageId ? updateObj.localImage : imageId,
      };
      const response = await makeRequest(
        `/api/product/${updateObj._id}`,
        "PUT",
        productObj
      );
      if (!response.ok) {
        setError(response.result);
      } else {
        fetchAllProducts();
        setImageId("");
      }
    },
    [fetchAllProducts, imageId, setError]
  );

  // upload new image to the media collection in db (and remove if there is an existing one)
  const fileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;
      if (imageId) await fetch("/api/media/" + imageId, { method: "DELETE" });

      const formData = new FormData();
      formData.set("media", event.target.files[0]);

      setImageId("");
      setIsUploading(true);
      const response = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        setError("Upload unsucessful");
      } else {
        const imageData = await response.json();
        setIsUploading(false);
        setImageId(imageData._id);
      }
    },
    [imageId, setError]
  );

  return (
    <AdminProductContext.Provider
      value={{
        isEdit,
        isUploading,
        setEdit,
        addProduct,
        updateProduct,
        removeProduct,
        fileUpload,
        imageId,
        setImageId,
      }}
    >
      {props.children}
    </AdminProductContext.Provider>
  );
};

export default AdminProductProvider;
export const useAdminProduct = () => useContext(AdminProductContext);
