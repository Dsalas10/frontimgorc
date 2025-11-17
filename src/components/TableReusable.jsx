import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

const TableReusable = ({ data, columns, onRowClick }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ✅ Reinicia la página cuando los datos cambian
  useEffect(() => {
    setPage(0);
  }, [data]);

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400, overflowY: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: "grey.100" }}>
            {columns.map((col, index) => (
              <TableCell key={index} sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              sx={{
                "&:hover": { backgroundColor: "grey.50" },
                cursor: onRowClick ? "pointer" : "default",
                border: "1px solid #ddd",
              }}
            >
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex} sx={{ border: "1px solid #ddd" }}>
                  {row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginación */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
    </TableContainer>
  );
};

export default TableReusable;
