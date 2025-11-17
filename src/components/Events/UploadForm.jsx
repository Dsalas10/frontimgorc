import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useRef } from "react"; // Agrega useRef
import { api } from "../../Utils/apifetch";
const UploadForm = ({ onFileUpload }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [globalIndex, setGlobalIndex] = useState(1);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 70) {
      setError("Máximo 70 imágenes permitidas.");
      return;
    }
    setFiles(selectedFiles);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setError("Por favor, selecciona al menos una imagen.");
      return;
    }

    setLoading(true);
    setError("");
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(
        "https://backimgorc.onrender.com/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      let currentIndex = globalIndex;
      const newResults = response.data.map((item) => ({
        ...item,
        globalIndex: currentIndex++,
      }));

      if (onFileUpload) onFileUpload(newResults);

      setGlobalIndex(currentIndex);
      setFiles([]); // Resetea el estado
      
    } catch (err) {
      setError(
        "Error al procesar las imágenes. Verifica el backend o las imágenes."
      );
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 2 }}>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        align="center"
        color="primary"
      >
        Subida de Imágenes
      </Typography>

      <Card sx={{ mb: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Subir Imágenes para OCR
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Sube hasta 70 screenshots o fotos para extraer el total de cada una.
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Input file con ref */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
             
              multiple
              style={{ display: 'none' }} // Oculta el input
              id="file-input"
            />
            <label htmlFor="file-input">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                sx={{ mb: 2, textTransform: 'none' }}
              >
                Elegir Archivos
              </Button>
            </label>
            {/* Mensaje dinámico */}
            <Typography variant="body2" sx={{ mb: 2, color: files.length > 0 ? "green" : "text.secondary" }}>
              {files.length === 0 ? "No hay imágenes seleccionadas." : `${files.length} imagen(es) seleccionada(s).`}
            </Typography>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              disabled={loading}
              fullWidth
              sx={{
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Subir y Procesar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UploadForm;
