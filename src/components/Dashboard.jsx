import React, { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import Navbar from "./Navbar/Navbar";
const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          backgroundColor: "#f5f5f5",
          overflowY: "auto",
        }}
      >
        {/* Aquí irá el contenido dinámico según la ruta */}
        <h1>Bienvenido al Dashboard</h1>
      </Box>

      {/* Drawer lateral */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List sx={{ width: 250 }}>
          <ListItem button onClick={() => setDrawerOpen(false)}>
            <ListItemText primary="Inicio" />
          </ListItem>

          {/* otras opciones */}
        </List>
      </Drawer>
    </>
  );
};

export default Dashboard;
