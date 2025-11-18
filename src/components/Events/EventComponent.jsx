import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import UploadForm from "./UploadForm";
import TableReusable from "../TableReusable";
import { useState } from "react";
import { api } from "../../Utils/apifetch";

const columns = [
  { header: "#", key: "globalIndex" },
  { header: "Archivo", key: "archivo" },
  { header: "Total", key: "total" }, // Nota: Tienes "columna2" dos veces, ¿es intencional? Si no, cámbialo a "columna3"
];

const EventComponent = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (newResults) => {
    const formattedResults = newResults.map((item) => ({
      globalIndex: item.globalIndex || "-",
      archivo: item.archivo || "",
      total: item.total || 0,
    }));
    setData((prev) => [...prev, ...formattedResults]);
  };

  const cantidad = data.length;
  const totalGeneral = data.reduce((suma, data) => suma + (data.total || 0), 0);

  const handleAddNuevo = async () => {
    if (data.length === 0) return;

    const lote = {
      productos: data.map((item) => ({
        numero: item.globalIndex,
        archivo: item.archivo,
        total: item.total,
      })),
      totalProductos: totalGeneral,
      comandas: cantidad,
    };
    try {
      const response = await api.post("eventos/nuevo", lote);
      console.log("Lote guardado:", response);

      // ✅ Limpiar datos y reiniciar tabla
      setData([]);
    } catch (err) {
      console.error("Error guardando lote:", err);
    }
  };

  return (
    <Box>
      {/* <Typography variant="h5" gutterBottom align="center">
        Título del Evento
      </Typography> */}
      <Grid container  sx={{ height: "100%" }}>
        <Grid
          size={{ xs: 12, sm: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%", // Fuerza altura igual
          }}
        >
          <UploadForm onFileUpload={handleFileUpload} />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%", // Fuerza altura igual
          }}
        >
          <Box
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              label="Cantidad:"
              value={cantidad}
              disabled
              variant="outlined"
              sx={{ width: "110px" }} // Ancho fijo para hacerlo más pequeño
            />
            <TextField
              label="Total:"
              value={totalGeneral}
              disabled
              variant="outlined"
              sx={{ width: "110px" }} // Ancho fijo para hacerlo más pequeño
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "110px", height: "52px" }}
              onClick={handleAddNuevo}
            >
              Guardar
            </Button>
          </Box>

          <TableReusable data={data} columns={columns} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventComponent;
