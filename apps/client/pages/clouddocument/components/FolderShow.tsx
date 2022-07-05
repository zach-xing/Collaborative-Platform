import React from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { MdMoreHoriz } from "react-icons/md";

const columns: Array<{
  id: "name" | "date";
  label: string;
  minWidth?: number;
}> = [
  { id: "name", label: "名称", minWidth: 300 },
  { id: "date", label: "日期", minWidth: 100 },
];

const rows: Array<{ id: string; name: string; date: string }> = [
  { id: "1", name: "123", date: "2022.7.5" },
  { id: "2", name: "11123", date: "2022.7.5" },
  { id: "3", name: "11123", date: "2022.7.2" },
  { id: "4", name: "11123", date: "2022.7.2" },
  { id: "5", name: "11123", date: "2022.7.2" },
  { id: "6", name: "11123", date: "2022.7.2" },
  { id: "7", name: "11123", date: "2022.7.2" },
  { id: "8", name: "11123", date: "2022.7.2" },
];

/**
 * 展示文件夹中的文件或文件夹
 */
const FolderShow = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5">展示</Typography>
      </Box>

      <Box sx={{ flex: 9 }}>
        <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover key={row.id}>
                        {/* 名称 */}
                        <TableCell>
                          <Button>{row.name}</Button>
                        </TableCell>
                        {/* 日期 */}
                        <TableCell>{row.date}</TableCell>
                        {/* more options */}
                        <TableCell>
                          <IconButton>
                            <MdMoreHoriz />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={rows.length}
            rowsPerPage={10}
            rowsPerPageOptions={[10]}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FolderShow;
