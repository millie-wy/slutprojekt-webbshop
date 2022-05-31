import { Alert, Snackbar } from "@mui/material";
import { useUser } from "../../context/UserContextProvider";

const ErrorSnackBar = () => {
  const { setError, error } = useUser();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setError("");
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={error.length > 1}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackBar;
