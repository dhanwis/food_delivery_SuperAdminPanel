import PropTypes from "prop-types";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import Building from "@heroicons/react/24/solid/BuildingStorefrontIcon";
import NextLink from "next/link";

// import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
// import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import {
  Avatar,
  Box,
  TextField,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

export const FranchiseCard = (props) => {
  const { franchise } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = () => {};
  const handleSubmit = () => {};
  const handleBlock = () => {};
  const handleDelete = () => {};

  const formData = { name: "any", description: "something" };

  return (
    <>
      <NextLink href={`/franchises/${franchise.id}`} style={{ textDecoration: "none" }} passHref>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            cursor: "pointer",
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pb: 3,
              }}
            >
              <Avatar src={franchise.logo} variant="square" />
            </Box>
            <Typography align="center" gutterBottom variant="h5">
              {franchise.title}
            </Typography>
            <Typography align="center" variant="body1">
              {franchise.description}
            </Typography>
          </CardContent>
          <Box sx={{ flexGrow: 1 }} />
          <Divider />
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{ p: 2 }}
          >
            <Stack alignItems="center" direction="row" spacing={1}>
              <SvgIcon color="action" fontSize="small">
                <Building />
              </SvgIcon>
              <Typography color="text.secondary" display="inline" variant="body2">
                {franchise.downloads} Restaurants
              </Typography>
            </Stack>
            <Stack alignItems="center" direction="row" spacing={1}>
              {/* <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            Updated 2hr ago
          </Typography> */}
              <div>
                <Button
                  onClick={handleOpen}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Manage
                </Button>
              </div>
            </Stack>
          </Stack>
        </Card>
      </NextLink>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {/* Edit form section */}
          <Typography variant="h6" gutterBottom>
            Edit Franchise
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Franchise Name"
              name="name"
              value={formData.title}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            {/* Add more fields as needed */}
            <Button
              onClick={handleBlock}
              variant="contained"
              sx={{
                marginRight: 1,
                bgcolor: "black",
                "&:hover": {
                  bgcolor: "black", // Change to your desired hover color
                },
              }}
              startIcon={
                <SvgIcon fontSize="small">
                  <BlockIcon />
                </SvgIcon>
              }
            >
              Block
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              startIcon={
                <SvgIcon fontSize="small">
                  <DeleteIcon />
                </SvgIcon>
              }
              sx={{
                marginRight: 1,
                bgcolor: "red",
                "&:hover": {
                  bgcolor: "red", // Change to your desired hover color
                },
              }}
            >
              Delete
            </Button>

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save Changes
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

FranchiseCard.propTypes = {
  franchise: PropTypes.object.isRequired,
};
