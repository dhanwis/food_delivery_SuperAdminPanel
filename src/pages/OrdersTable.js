import PropTypes from "prop-types";
import { useState } from "react";
import { Link as RouterLink } from "next/link";

// material-ui
import {
  Box,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

// third-party
import { NumericFormat } from "react-number-format";
import Dot from "src/components/Dot";
import RestaurantModal from "./restaurantModal/restaurantModal";

// project import
//import Dot from 'components/@extended/Dot';

function createData(_id, name, fat, status, protein) {
  return { _id, name, fat, status, protein };
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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: "trackingNo",
    align: "left",
    disablePadding: false,
    label: "Tracking_Id.",
  },
  {
    id: "name",
    align: "left",
    disablePadding: true,
    label: "Franchise Name",
  },
  {
    id: "location",
    align: "right",
    disablePadding: false,
    label: "Location",
  },
  {
    id: "status",
    align: "left",
    disablePadding: false,

    label: "Status",
  },
  {
    id: "phoneNumber",
    align: "right",
    disablePadding: false,
    label: "Phone Number",
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
    case "active":
      color = "success";
      title = "active";
      break;
    case "blocked":
      color = "error";
      title = "blocked";
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

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable({ displayedFranchise }) {
  const [restaurantModal, setOpenRestaurantModal] = useState(false);
  const [order] = useState("asc");
  const [orderBy] = useState("trackingNo");
  const [selected] = useState([]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  const [selectedFranchise, setSelectedFranchise] = useState(null);

  const handleLinkClick = (franchiseName) => {
    setSelectedFranchise(franchiseName);
    setOpenRestaurantModal(!restaurantModal); // Toggle the modal
  };

  return (
    <>
      <Box>
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
              {displayedFranchise.map((row, index) => {
                const isItemSelected = isSelected(row.trackingNo);

                //const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" scope="row">
                      <Link
                        color="secondary"
                        component={RouterLink}
                        to=""
                        sx={{ cursor: "pointer" }}
                        // onClick={() => setOpenRestaurantModal(!restaurantModal)}
                        onClick={() => handleLinkClick(row.franchiseName)}
                      >
                        {row._id}
                      </Link>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.location}</TableCell>

                    <TableCell align="left">
                      <OrderStatus status={row.status} />
                    </TableCell>
                    <TableCell align="right">{row.phoneNumber}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <RestaurantModal
        franchiseName={selectedFranchise}
        setOpenRestaurantModal={setOpenRestaurantModal}
        restaurantModal={restaurantModal}
      />
    </>
  );
}
