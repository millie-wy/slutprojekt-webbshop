import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Typography } from "@mui/material";
import { CSSProperties } from "react";
import ReactDOM from "react-dom";
import AddProductForm from "./AddProductForm";

const modalStyles: CSSProperties = {
  position: "fixed",
  top: "8rem",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#FFF",
  padding: "40px",
  maxHeight: "70vh",
  overflowY: "scroll",
};

const overlayStyles: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .8)",
};

export default function AddProductFormModal({ open, onClose }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div style={overlayStyles} />
      <div style={modalStyles}>
        <Button
          onClick={onClose}
          style={{ position: "fixed", padding: "0", top: "15px", left: "5px" }}
        >
          <CloseIcon style={{ color: "#333" }} />
        </Button>
        <Box sx={{ overflow: "hidden" }}>
          <Typography
            fontFamily="Prata"
            sx={{
              textAlign: "center",
              paddingBottom: "1rem",
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              fontWeight: 600,
            }}
          >
            ADD A NEW PRODUCT
          </Typography>
          <AddProductForm />
        </Box>
      </div>
    </>,
    document.getElementById("portal")!
  );
}
