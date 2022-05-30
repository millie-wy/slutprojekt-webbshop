import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useAdminProduct } from "../../../context/AdminProductContextProvider";
import NewProductConfirmation from "./NewProductConfirmation";
import type { Product } from "@server/shared/client.types";

const InitialValue: Product = {
  title: "",
  description: "",
  price: 0,
  stock: 0,
  category: [""],
};

const ProductValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  price: yup.number().required("Price is required"),
  stock: yup.number().required("Stock is required"),
});

function AddProductForm() {
  const { addProduct } = useAdminProduct();
  const [confirmation, setConfirmation] = useState(false);

  // const validateAndSaveNewProduct = (values: Product) => {
  //   /** makes new product and after 0.5 sec shows confirmation */
  //   let promise = new Promise((resolve) => {
  //     setTimeout(() => {
  //       // COMMENT BY MILLIE: commented out this part because it had error after corrected the import of Product from client.types
  //       // const newProduct: Product = {
  //       //   id: generateId()
  //       //   title: values.title,
  //       //   description: values.description,
  //       //   price: values.price,
  //       //   image: values.image,
  //       // };
  //       // addProduct(newProduct);
  //       // resolve(newProduct);
  //     }, 500);
  //   });
  //   promise.then(() => {
  //     setConfirmation(true); ///// add back later
  //   });
  // };

  const { values, errors, touched, handleSubmit, handleChange } =
    useFormik<Product>({
      initialValues: InitialValue,
      validationSchema: ProductValidationSchema,
      onSubmit: (values: Product) => {
        console.log(values);
      },
    });

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: "3rem",
            justifyContent: "center",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextField
              required
              type="text"
              name="title"
              label="Title"
              margin="normal"
              value={values.title}
              onChange={handleChange}
              error={touched.title && Boolean(errors.title)}
            />
            <TextField
              required
              type="text"
              name="description"
              label="Description"
              value={values.description}
              onChange={handleChange}
              error={touched.description && Boolean(errors.description)}
              margin="normal"
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextField
              required
              type="number"
              name="price"
              label="Price"
              value={values.price}
              onChange={handleChange}
              error={touched.price && Boolean(errors.price)}
              margin="normal"
            />
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                required
                labelId="category"
                name="category"
                label="Category"
                value={values.category}
                onChange={handleChange}
                error={touched.category && Boolean(errors.category)}
              >
                <MenuItem value="Chairs & Stools">Chairs & Stools</MenuItem>
                <MenuItem value="Sofas & Armchairs">Sofas & Armchairs</MenuItem>
                <MenuItem value="Tables">Tables</MenuItem>
                <MenuItem value="Beds">Beds</MenuItem>
                <MenuItem value="Storage">Storage</MenuItem>
                <MenuItem value="Mirrors">Mirrors</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <TextField /* CHANGE TO CORRECT STOCK DATA */
          required
          type="number"
          name="stock"
          label="Stock"
          value={values.stock}
          onChange={handleChange}
          error={touched.stock && Boolean(errors.stock)}
          margin="normal"
        />
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            fontSize: "12px",
          }}
        >
          <label
            htmlFor="uploadImg"
            style={{
              backgroundColor: "#ed6c02",
              color: "white",
              padding: ".1rem",
              paddingLeft: ".5rem",
              paddingRight: ".5rem",
              borderRadius: "4px",
              marginTop: ".4rem",
            }}
          >
            Choose File
          </label>
          <input
            id="uploadImg"
            type={"file"}
            accept="image/*"
            style={{
              opacity: 0,
              position: "absolute",
              zIndex: -1,
            }}
          />
        </Box>
        <Button
          onClick={NewProductConfirmation}
          size="large"
          variant="contained"
          style={{
            display: "flex",
            justifyContent: "center",
            width: "200px",
            backgroundColor: "#CAC2B9",
            color: "white",
            letterSpacing: "3px",
            marginTop: "2rem",
          }}
          type="submit"
        >
          ADD PRODUCT
        </Button>
      </form>
      {confirmation ? <NewProductConfirmation /> : undefined}
    </Container>
  );
}

export default AddProductForm;
