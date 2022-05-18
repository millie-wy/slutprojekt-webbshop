import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import AddProductForm from "./AddProductForm";
import AdminCollapsibleTable from "./AdminCollapsibleTable";
import BasicTable from "./OrderTable";
import Modal from "./Modal";

function AdminPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        minHeight: "35rem",
      }}
    >
      <Typography
        sx={{ textTransform: "uppercase", fontFamily: "Prata", mt: "1rem" }}
        variant="h5"
      >
        Admin
      </Typography>
      <Box style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          style={{
            display: "flex",
            width: "fit-content",
            backgroundColor: "#CAC2B9",
            textTransform: "none",
          }}
          onClick={() => setIsOpen(true)}
        >
          ADD
          <AddIcon />
        </Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <AddProductForm />
        </Modal>
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "3rem",
        }}
      >
        <AdminCollapsibleTable />

        <Typography
          sx={{ textTransform: "uppercase", fontFamily: "Prata", mt: "1rem" }}
          variant="h6"
        >
          Orders
        </Typography>
        <BasicTable />
      </div>
    </Container>
  );
}

export default AdminPage;
