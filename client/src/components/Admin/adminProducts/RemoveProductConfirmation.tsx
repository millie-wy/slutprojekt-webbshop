import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import type { Product } from "@server/shared/client.types";
import { useState } from "react";
import { useAdminProduct } from "../../../context/AdminProductContextProvider";

interface Props {
  product: Product;
}

function RemoveProductConfirmation(props: Props) {
  const [open, setOpen] = useState(true);
  const { removeProduct } = useAdminProduct();

  const handleClose = () => setOpen(false);

  const handleRemoveProduct = () => {
    removeProduct(props.product);
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to remove this item?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be reverted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              color: "#333",
            }}
            onClick={handleClose}
          >
            NO
          </Button>
          <Button
            style={{
              color: "#333",
            }}
            onClick={handleRemoveProduct}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default RemoveProductConfirmation;
