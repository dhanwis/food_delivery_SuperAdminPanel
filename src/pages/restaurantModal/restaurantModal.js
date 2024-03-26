import PropTypes from "prop-types";
import Pagination from "@mui/material/Pagination";

import { useState } from "react";

import {
  Box,
  Table,
  TableBody,
  Link,
  Stack,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Link as RouterLink } from "next/link";
import Dot from "src/components/Dot";
import { NumericFormat } from "react-number-format";
import { RestaurantsSearch } from "../restaurants-search";

function createData(trackingNo, name, fat, carbs, protein) {
  return { trackingNo, name, fat, carbs, protein };
}

export const rows = [
  createData(84564564, "Camera Lens", 40, 2, 40570),
  createData(98764564, "Laptop", 300, 0, 180139),
  createData(98756325, "Mobile", 355, 1, 90989),
  createData(98652366, "Handset", 50, 1, 10239),
  createData(13286564, "Computer Accessories", 100, 1, 83348),
  createData(86739658, "TV", 99, 0, 410780),
  createData(13256498, "Keyboard", 125, 2, 70999),
  createData(98753263, "Mouse", 89, 2, 10570),
  createData(98753275, "Desktop", 185, 1, 98063),
  createData(98753291, "Chair", 100, 0, 14001),
];

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: "trackingNo",
    align: "left",
    disablePadding: false,
    label: "Tracking No.",
  },
  {
    id: "name",
    align: "left",
    disablePadding: true,
    label: "Restaurants Name",
  },
  {
    id: "fat",
    align: "right",
    disablePadding: false,
    label: "Total Order",
  },
  {
    id: "carbs",
    align: "left",
    disablePadding: false,

    label: "Status",
  },
  {
    id: "protein",
    align: "right",
    disablePadding: false,
    label: "Total Profit",
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = "warning";
      title = "Pending";
      break;
    case 1:
      color = "success";
      title = "Available";
      break;
    case 2:
      color = "error";
      title = "Unavailable";
      break;
    default:
      color = "primary";
      title = "None";
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number,
};

export default function RestaurantModal({
  restaurantModal,
  setOpenRestaurantModal,
  franchiseName,
}) {
  const [order] = useState("asc");
  const [orderBy] = useState("trackingNo");
  const [selected] = useState([]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset page when search query changes
  };

  const filteredRestaurant = rows.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRestaurants = filteredRestaurant.length;
  const totalPages = Math.ceil(totalRestaurants / rowsPerPage);

  // Calculate displayed franchises based on pagination
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRestaurants);

  const displayedRestaurants = filteredRestaurant.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  return (
    <Dialog
      open={restaurantModal}
      onClose={() => setOpenRestaurantModal(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        <RestaurantsSearch handleSearchChange={handleSearchChange} />
        <Box>
          <Typography variant="h6" component="h2">
            {franchiseName}
          </Typography>
          <TableContainer
            sx={{
              width: "100%",
              overflowX: "auto",
              position: "relative",
              display: "block",
              maxWidth: "100%",
              "& td, & th": { whiteSpace: "nowrap" },
            }}
          >
            <Table
              aria-labelledby="tableTitle"
              sx={{
                "& .MuiTableCell-root:first-of-type": {
                  pl: 2,
                },
                "& .MuiTableCell-root:last-of-type": {
                  pr: 3,
                },
              }}
            >
              <OrderTableHead order={order} orderBy={orderBy} />
              <TableBody>
                {displayedRestaurants.map((row, index) => {
                  const isItemSelected = isSelected(row.trackingNo);
                  console.log(row.carbs);
                  //const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.trackingNo}
                      selected={isItemSelected}
                    >
                      <TableCell component="th" scope="row">
                        <Link
                          color="secondary"
                          component={RouterLink}
                          to=""
                          sx={{ cursor: "pointer" }}
                        >
                          {row.trackingNo}
                        </Link>
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>

                      <TableCell align="left">
                        <OrderStatus status={row.carbs} />
                      </TableCell>
                      <TableCell align="right">${row.protein}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} size="large" />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
