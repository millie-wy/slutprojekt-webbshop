import * as React from "react";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";

// interface Props {
//   props: Props;
// }

function MenuListComposition(props) {
  const productContext = useContext(ProductContext);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // productContext.handleCategoryChange(e);

  return (
    <Stack
      style={{
        marginTop: "2rem",
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
          onChange={productContext.handleCategoryChange}
          style={{
            width: "100%",
            display: "flex",
            columnGap: "1rem",
            justifyContent: "space-between",
          }}
        >
          <MenuItem
            style={{
              fontSize: ".85rem",
              backgroundColor: "#F4ECE3",
              width: "9rem",
              textAlign: "center",
              paddingLeft: "1.3rem",
              color: "black",
            }}
            value="ChairsAndStools"
          >
            Chairs {`&`} Stools
          </MenuItem>
          <MenuItem
            style={{
              fontSize: ".9rem",
              backgroundColor: "#F4ECE3",
              width: "9rem",
              textAlign: "center",
              paddingLeft: ".6rem",
              color: "black",
            }}
            value="SofasAndArmchairs"
          >
            Sofas {`&`} Armchairs
          </MenuItem>
          <MenuItem
            style={{
              fontSize: ".9rem",
              backgroundColor: "#F4ECE3",
              width: "9rem",
              textAlign: "center",
              paddingLeft: "3rem",
              color: "black",
            }}
            value="Tables"
          >
            Tables
          </MenuItem>
          <MenuItem
            style={{
              fontSize: ".9rem",
              backgroundColor: "#F4ECE3",
              width: "9rem",
              textAlign: "center",
              paddingLeft: "3.2rem",
              color: "black",
            }}
            value="Beds"
          >
            Beds
          </MenuItem>
          <MenuItem
            style={{
              fontSize: ".9rem",
              backgroundColor: "#F4ECE3",
              width: "9rem",
              textAlign: "center",
              paddingLeft: "3rem",
              color: "black",
            }}
            value="Storage"
          >
            Storage
          </MenuItem>
          <MenuItem
            style={{
              fontSize: ".9rem",
              backgroundColor: "#F4ECE3",
              width: "9rem",
              textAlign: "center",
              paddingLeft: "3rem",
              color: "black",
            }}
            value="Mirrors"
          >
            Mirrors
          </MenuItem>
        </MenuList>
      </Paper>
    </Stack>
  );
}

export default MenuListComposition;
