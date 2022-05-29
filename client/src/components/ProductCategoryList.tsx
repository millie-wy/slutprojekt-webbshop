import { MenuItem, MenuList } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useProduct } from "../context/ProductContextProvider";

function ProductCategoryList() {
  const { handleCategoryChange } = useProduct();
  const [selected, setSelected] = useState<string>("");

  const categoryOnChange = (e) => {
    handleCategoryChange(e);
    setSelected(e.currentTarget.innerText.trim());
  };

  return (
    <Stack
      style={{
        marginTop: "1rem",
        width: "100%",
      }}
      direction="row"
      spacing={2}
    >
      <Paper
        style={{
          width: "100%",
          display: "flex",
          boxShadow: "none",
        }}
      >
        <MenuList
          sx={{
            width: "100%",
            display: "flex",
            gap: { xs: ".5rem", sm: "1rem" },
            justifyContent: { xs: "center", sm: "space-around" },
            flexWrap: "wrap",
          }}
        >
          <MenuItem
            sx={{
              fontSize: ".85rem",
              backgroundColor: selected === "All" ? "#f5f5f5" : "#F4ECE3",
              width: { xs: "4rem", sm: "9rem" },
              minHeight: "2rem",
              justifyContent: "center",
            }}
            onClick={categoryOnChange}
            value="All"
          >
            All
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: ".85rem",
              backgroundColor:
                selected === "Chairs & Stools" ? "#f5f5f5" : "#F4ECE3",
              minWidth: { xs: "4rem", sm: "9rem" },
              minHeight: "2rem",
              justifyContent: "center",
            }}
            onClick={categoryOnChange}
            value="Chairs & Stools"
          >
            Chairs {`&`} Stools
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: ".85rem",
              backgroundColor:
                selected === "Sofas & Armchairs" ? "#f5f5f5" : "#F4ECE3",
              minWidth: { xs: "4rem", sm: "9rem" },
              minHeight: "2rem",
              justifyContent: "center",
            }}
            onClick={categoryOnChange}
            value="Sofas & Armchairs"
          >
            Sofas {`&`} Armchairs
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: ".85rem",
              backgroundColor: selected === "Tables" ? "#f5f5f5" : "#F4ECE3",
              minWidth: { xs: "4rem", sm: "9rem" },
              minHeight: "2rem",
              justifyContent: "center",
            }}
            value="Tables"
            onClick={categoryOnChange}
          >
            Tables
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: ".85rem",
              backgroundColor: selected === "Beds" ? "#f5f5f5" : "#F4ECE3",
              minWidth: { xs: "4rem", sm: "9rem" },
              minHeight: "2rem",
              justifyContent: "center",
            }}
            value="Beds"
            onClick={categoryOnChange}
          >
            Beds
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: ".85rem",
              backgroundColor: selected === "Storage" ? "#f5f5f5" : "#F4ECE3",
              minWidth: { xs: "4rem", sm: "9rem" },
              minHeight: "2rem",
              justifyContent: "center",
            }}
            value="Storage"
            onClick={categoryOnChange}
          >
            Storage
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: ".85rem",
              backgroundColor: selected === "Mirrors" ? "#f5f5f5" : "#F4ECE3",
              minWidth: { xs: "4rem", sm: "9rem" },
              minHeight: "2rem",
              justifyContent: "center",
            }}
            value="Mirrors"
            onClick={categoryOnChange}
          >
            Mirrors
          </MenuItem>
        </MenuList>
      </Paper>
    </Stack>
  );
}

export default ProductCategoryList;
