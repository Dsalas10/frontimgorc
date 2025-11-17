import React from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",  
        width: "100vw",    
      }}
    >
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENIDO CON SCROLL */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          backgroundColor: "#f5f5f5",
          p: 2, // opcional
        }}
      >
        <Outlet />
      </Box>

      {/* FOOTER */}
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 3,
          backgroundColor: "grey.100",
          textAlign: "center",
          borderTop: "1px solid #ddd",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2024 GestorFinanzas - Sistema de control financiero
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
