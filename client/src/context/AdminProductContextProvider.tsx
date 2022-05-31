import type { Product } from "@server/shared/client.types";
import { Types } from "mongoose";
import React, { createContext, FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../Helper";
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
  const navigate = useNavigate();
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [imageId, setImageId] = useState<string | Types.ObjectId>("");

  // add a new product to the product collection in db
  const addProduct = async (values: Product) => {
    try {
      const productObj = {
        title: values.title,
        description: values.description,
        price: values.price,
        stock: values.stock,
        category: values.category,
        imageId: imageId,
      };
      await makeRequest("/api/product", "POST", productObj);
      fetchAllProducts()
    } catch (error) {
      console.error(error);
    }
  };

  // remove a product from product collection in db
  const removeProduct = async (product: Product) => {
    await makeRequest(`/api/product/${product._id}`, "DELETE");
    fetchAllProducts()
    setTimeout(() => {
      navigate("/admin-products");
    }, 1000);
  };

  // update a product in product collection in db
  const updateProduct = async (updateObj) => {
    try {
      const productObj = {
        title: updateObj.title,
        description: updateObj.description,
        price: updateObj.price,
        stock: updateObj.stock,
        category: updateObj.category,
        imageId: !imageId ? updateObj.localImage : imageId,
      };
      await makeRequest(`/api/product/${updateObj._id}`, "PUT", productObj);
      fetchAllProducts()
      setImageId("");
      navigate("/admin-products");
    } catch (error) {
      console.error(error);
    }
  };

  const fileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      console.log(imageId);
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
      const imageData = await response.json();
      setIsUploading(false);
      setImageId(imageData._id);
    } catch (error) {
      console.error(error);
    }
  };

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
