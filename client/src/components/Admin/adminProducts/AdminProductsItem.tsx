import { DeleteOutline } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import type { Product } from "@server/shared/client.types";
import { Fragment, useState } from "react";
import { useAdminProduct } from "../../../context/AdminProductContextProvider";
import { numWithSpaces } from "../../../Helper";
import RemoveProductConfirmation from "./RemoveProductConfirmation";

interface Props {
  product: Product;
}

function AdminProductsItem(props: Props) {
  const { isEdit, setEdit, updateProduct } = useAdminProduct();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string>(props.product.imageUrl!);
  const [stock, setStock] = useState<number | undefined>(props.product.stock);
  const [title, setTitle] = useState<string>(props.product.title);
  const [category, setCategory] = useState<string>(props.product.category[0]);
  const [description, setDescription] = useState<string>(
    props.product.description
  );
  const [price, setPrice] = useState<number>(props.product.price);
  const [openRemove, setOpenRemove] = useState(false);

  const handleChange = (event: SelectChangeEvent) =>
    setCategory(event.target.value as string);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset", fontSize: "12px" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.product.title}
        </TableCell>
        <TableCell>{props.product.category}</TableCell>
        {/* <TableCell>{numWithSpaces(props.product.price)} SEK</TableCell> */}
        <TableCell>{props.product.stock}</TableCell>
      </TableRow>

      <TableRow sx={{ "& > *": { borderBottom: "unset", fontSize: "12px" } }}>
        <TableCell
          style={{
            padding: 0,
            backgroundColor: "#F8F4EF",
          }}
          colSpan={4}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset", fontSize: "12px" } }}
                >
                  <TableCell
                    align="left"
                    sx={{
                      px: { md: "5rem" },
                      color: "#6C665F",
                      fontSize: "12px",
                    }}
                    colSpan={1}
                  >
                    Image
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ color: "#6C665F", fontSize: "12px" }}
                    colSpan={1}
                  >
                    Title
                  </TableCell>
                  <TableCell colSpan={1} />
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow contentEditable={isEdit}>
                  <TableCell
                    align="left"
                    sx={{
                      px: { md: "5rem" },
                    }}
                  >
                    {isEdit ? (
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
                        <img
                          src={`http://localhost:3001${props.product.imageUrl}`}
                          alt={props.product.title}
                          style={{ maxHeight: "180px" }}
                        />
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
                    ) : (
                      <img
                        src={`http://localhost:3001${props.product.imageUrl}`}
                        alt={props.product.title}
                        style={{ maxHeight: "180px" }}
                      />
                    )}
                  </TableCell>

                  <TableCell align="left" colSpan={1}>
                    {isEdit ? (
                      <TextField
                        value={title}
                        variant="standard"
                        onChange={(event) => setTitle(event.target.value)}
                        inputProps={{ style: { fontSize: ".9rem" } }}
                        InputLabelProps={{ style: { fontSize: ".9rem" } }}
                      />
                    ) : (
                      <Typography fontSize="12px">
                        {props.product.title}
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell align="left" colSpan={1}>
                    <Button onClick={() => setOpenRemove(true)}>
                      {openRemove ? (
                        <RemoveProductConfirmation product={props.product} />
                      ) : undefined}
                      <DeleteOutline style={{ color: "#ed6c02" }} />
                    </Button>

                    {!isEdit ? (
                      <Button
                        onClick={() => {
                          setEdit(true);
                        }}
                      >
                        <EditIcon style={{ color: "#ed6c02" }} />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          // saveProduct({
                          //   id: props.product._id,
                          //   title,
                          //   image,
                          //   description,
                          //   price,
                          // });
                        }}
                      >
                        <DoneIcon style={{ color: "#ed6c02" }} />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>

              <TableHead>
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset", fontSize: "12px" } }}
                >
                  <TableCell
                    align="left"
                    sx={{
                      color: "#6C665F",
                      fontSize: "12px",
                      px: { md: "5rem" },
                    }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ color: "#6C665F", fontSize: "12px" }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ color: "#6C665F", fontSize: "12px" }}
                  >
                    Stock
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow contentEditable={isEdit}>
                  <TableCell align="left" sx={{ px: { md: "5rem" } }}>
                    {isEdit ? (
                      <FormControl fullWidth>
                        <InputLabel id="product-category">Category</InputLabel>
                        <Select
                          labelId="product-category"
                          id="product-category"
                          value={category}
                          label="Category"
                          onChange={handleChange}
                        >
                          <MenuItem value="Chairs & Stools">
                            Chairs & Stools
                          </MenuItem>
                          <MenuItem value="Sofas & Armchairs">
                            Sofas & Armchairs
                          </MenuItem>
                          <MenuItem value="Tables">Tables</MenuItem>
                          <MenuItem value="Beds">Beds</MenuItem>
                          <MenuItem value="Storage">Storage</MenuItem>
                          <MenuItem value="Mirrors">Mirrors</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      <Typography fontSize="12px">
                        {props.product.category}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {isEdit ? (
                      <TextField
                        value={String(price)}
                        variant="standard"
                        onChange={(event) => {
                          console.log(isNaN(Number(event.target.value)));
                          if (!isNaN(Number(event.target.value))) {
                            setPrice(Number(event.target.value));
                          }
                        }}
                        inputProps={{ style: { fontSize: ".9rem" } }}
                        InputLabelProps={{ style: { fontSize: ".9rem" } }}
                      />
                    ) : (
                      <Typography fontSize="12px">
                        {numWithSpaces(props.product.price)}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {isEdit ? (
                      <TextField
                        value={String(stock)}
                        variant="standard"
                        onChange={(event) => {
                          if (!isNaN(Number(event.target.value))) {
                            setStock(Number(event.target.value));
                          }
                        }}
                        inputProps={{ style: { fontSize: ".9rem" } }}
                        InputLabelProps={{ style: { fontSize: ".9rem" } }}
                      />
                    ) : (
                      <Typography fontSize="12px">
                        {props.product.stock!}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="left"
                    sx={{
                      paddingX: { md: "5rem" },
                      color: "#6C665F",
                    }}
                  >
                    <Typography fontSize="12px">Description</Typography>
                  </TableCell>
                </TableRow>

                <TableCell
                  colSpan={4}
                  align="left"
                  sx={{
                    paddingX: { md: "5rem" },
                  }}
                >
                  {isEdit ? (
                    <TextareaAutosize
                      aria-label="description"
                      value={description}
                      style={{
                        width: "100%",
                        border: "none",
                        fontFamily: "inherit",
                        fontSize: ".9rem",
                        padding: "0.5rem 0.2rem ",
                        backgroundColor: "#F8F4EF",
                        borderBottom: "1px solid grey",
                      }}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  ) : (
                    <Typography fontSize="12px">
                      {props.product.description}
                    </Typography>
                  )}
                </TableCell>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
export default AdminProductsItem;
