import PropTypes from "prop-types";
import { format } from "date-fns";
import { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import Dot from "src/components/Dot";

function createCustomerData(customerName, email, location, phoneNumber, signedDate) {
  return { customerName, email, location, phoneNumber, signedDate };
}

export const customersData = [
  createCustomerData(84564564, "Camera Lens", 40, 2, 40570),
  createCustomerData(98764564, "Laptop", 300, 0, 180139),
  createCustomerData(98756325, "Mobile", 355, 1, 90989),
  createCustomerData(98652366, "Handset", 50, 1, 10239),
  createCustomerData(13286564, "Computer Accessories", 100, 1, 83348),
  createCustomerData(86739658, "TV", 99, 0, 410780),
  createCustomerData(13256498, "Keyboard", 125, 2, 70999),
  createCustomerData(98753263, "Mouse", 89, 2, 10570),
  createCustomerData(98753275, "Desktop", 185, 1, 98063),
  createCustomerData(98753291, "Chair", 100, 0, 14001),

  createCustomerData(84564564, "Camera Lens", 40, 2, 40570),
  createCustomerData(98764564, "Laptop", 300, 0, 180139),
  createCustomerData(98756325, "Mobile", 355, 1, 90989),
  createCustomerData(98652366, "Handset", 50, 1, 10239),
  createCustomerData(13286564, "Computer Accessories", 100, 1, 83348),
  createCustomerData(86739658, "TV", 99, 0, 410780),
  createCustomerData(13256498, "Keyboard", 125, 2, 70999),
  createCustomerData(98753263, "Mouse", 89, 2, 10570),
  createCustomerData(98753275, "Desktop", 185, 1, 98063),
  createCustomerData(98753291, "Chair", 100, 0, 14001),
];

const OrderStatusOfCustomers = ({ status }) => {
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

OrderStatusOfCustomers.propTypes = {
  status: PropTypes.number,
};

export const CustomersTable = (props) => {
  const {
    count = 0,
    customersData = [],
    setPage,
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    searchQuery,
    selected = [],
  } = props;

  // const startIndex = page * rowsPerPage; // which is eg: (2*5 == 10)
  // const endIndex = startIndex + rowsPerPage;

  // const displayedRows = customersData.slice(startIndex, endIndex);

  // const handlePageChange = (event, newPage) => {
  //   setPage(newPage - 1);
  // };

  // Filter franchises based on search query
  const filteredCustomers = customersData.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCustomers = filteredCustomers.length;
  const totalPages = Math.ceil(totalCustomers / rowsPerPage);

  // Calculate displayed franchises based on pagination
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalCustomers);

  const displayedCustomers = filteredCustomers.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell> */}
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Signed Up</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedCustomers.map((customer) => {
                const isSelected = selected.includes(customer.id);
                const createdAt = format(customer.createdAt, "dd/MM/yyyy");

                return (
                  <TableRow hover key={customer.id} selected={isSelected}>
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.id);
                          } else {
                            onDeselectOne?.(customer.id);
                          }
                        }}
                      />
                    </TableCell> */}
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={customer.avatar}>{getInitials(customer.name)}</Avatar>
                        <Typography variant="subtitle2">{customer.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      {customer.address.city}, {customer.address.state}, {customer.address.country}
                    </TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell align="left">
                      <OrderStatusOfCustomers />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} size="large" />
      </Box>
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
