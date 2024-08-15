import React, { useState } from "react";
import response from "../data/bikes_response.json";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import styles from "./BikeTable.module.css";

const BikeTable = () => {
  const [searchText, setSearchText] = useState("");
  const [sortedBikes, setSortedBikes] = useState(response);
  const [sortSettings, setSortSettings] = useState({
    column: "",
    direction: "asc",
  });

  const columns = Object.keys(response[0]);

  const handleSort = (column) => {
    const direction = sortSettings.column === column ? "desc" : "asc";
    const sorted = [...sortedBikes].sort((a, b) => {
      if (a[column] < b[column]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortedBikes(sorted);
    setSortSettings({ column, direction });
  };

  const filteredBikes = sortedBikes.filter((bike) =>
    columns.some((column) => bike[column].toString().startsWith(searchText))
  );

  return (
    <TableContainer component={Paper}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell sx={{ fontWeight: "bold" }} key={column}>
                <Button
                  onClick={() => handleSort(column)}
                  className={styles["header-button"]}
                >
                  {column}
                </Button>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>
                {column !== "BikeID" && (
                  <TextField
                    sx={{ marginTop: "10px" }}
                    placeholder="Search"
                    size="small"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredBikes.map((row) => (
            <TableRow key={row.BikeID}>
              {columns.map((column) => (
                <TableCell key={column}>{row[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BikeTable;
