import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
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
  category: "Chairs & Stools",
};

const ProductValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  price: yup.number().required("Price is required"),
  stock: yup.number().required("Stock is required"),
});

function AddProductForm() {
  const { addProduct, fileUpload, isUploading, imageId } = useAdminProduct();
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);

  const { values, errors, touched, handleSubmit, handleChange } =
    useFormik<Product>({
      initialValues: InitialValue,
      validationSchema: ProductValidationSchema,
      onSubmit: (values: Product) => {
        addProduct(values);
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
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: "3rem",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 0, sm: ".5rem", md: "1rem" },
            }}
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
              type="number"
              name="stock"
              label="Stock"
              value={values.stock}
              onChange={handleChange}
              error={touched.stock && Boolean(errors.stock)}
              margin="normal"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 0, sm: ".5rem", md: "1rem" },
            }}
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
            <FormControl fullWidth sx={{ my: "1rem" }}>
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
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 0, sm: ".5rem", md: "1rem" },
              width: 1,
            }}
          >
            <TextField
              required
              multiline
              rows={4}
              type="text"
              name="description"
              label="Description"
              value={values.description}
              onChange={handleChange}
              error={touched.description && Boolean(errors.description)}
              margin="normal"
              sx={{
                mx: "auto",
                minWidth: "195px",
                width: { xs: "195px", sm: "195px", md: "70%", lg: 1 },
                maxWidth: "440px",
              }}
            />
            <label
              htmlFor="uploadImg"
              style={{
                width: "fit-content",
                minWidth: "110px",
                margin: "auto",
                background: isUploading ? "#6C665F" : "#CAC2B9",
                color: "white",
                padding: ".5rem .9rem",
                borderRadius: "4px",
                textAlign: "center",
                marginTop: ".5rem",
              }}
            >
              {isUploading ? (
                <Box sx={{ fontSize: "12px" }}>
                  <CircularProgress
                    color="inherit"
                    size="12px"
                    sx={{ textAlign: "center", mr: ".5rem" }}
                  />
                  Uploading...
                </Box>
              ) : (
                "Choose Image"
              )}
            </label>
            <input
              disabled={isUploading}
              id="uploadImg"
              type={"file"}
              accept="image/*"
              style={{
                opacity: 0,
                position: "absolute",
                zIndex: -1,
              }}
              onChange={fileUpload}
            />
          </Box>
          <Typography variant="overline" color="grey">
            {imageId && !isUploading ? "1 image uploaded" : ""}
          </Typography>
        </Box>
        <Button
          onClick={() => setOpenConfirmation(true)}
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
          { openConfirmation ? (
            <NewProductConfirmation  />
          ) 
          : undefined 
          }
          ADD PRODUCT
        </Button>
      </form>
    </Container>
  );
}

export default AddProductForm;
