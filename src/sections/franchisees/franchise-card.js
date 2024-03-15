import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Building from "@heroicons/react/24/solid/BuildingStorefrontIcon";
import NextLink from "next/link";
import BlockIcon from "@mui/icons-material/Block";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  Button,
} from "@mui/material";
import FranchiseDetails from "./franchiseDetailPage";
import { Edit } from "@mui/icons-material";
import EditDialog from "./EditDialog";

export const FranchiseCard = (props) => {
  const { franchise } = props;

  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setShowDetails(false);
  };

  const handleOpenDetailPage = () => {
    setShowDetails(true);
  };

  return (
    <>
      {/* <NextLink href={`/franchises/${franchise.id}`} style={{ textDecoration: "none" }} passHref>
        
      </NextLink> */}

      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          cursor: "pointer",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          filter: franchise.status === "blocked" ? "blur(1px)" : "none",
        }}
      >
        <CardContent onClick={handleOpenDetailPage}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: 3,
            }}
          >
            <Avatar src={franchise.imageUrl} variant="square" />
          </Box>
          <Typography align="center" gutterBottom variant="h5">
            {franchise.name}
          </Typography>
          <Typography
            align="center"
            variant="body1"
            sx={{ marginBottom: "10px", marginTop: "20px" }}
          >
            Phone: {franchise.phoneNumber}
          </Typography>
          <Box sx={{ marginBottom: 1 }}>
            {" "}
            {/* Add margin bottom to create space */}
            <Typography align="center" variant="body1">
              createdAt: {franchise.createdAt}
            </Typography>
          </Box>
          <Typography align="center" variant="body1">
            location: {franchise.location}
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
              {franchise.restaurants} Restaurants
            </Typography>
          </Stack>

          <Stack alignItems="center" direction="row">
            <div>
              <Button
                onClick={handleOpen}
                startIcon={
                  <SvgIcon fontSize="small">
                    <Edit />
                  </SvgIcon>
                }
                variant="contained"
                onMouseDown={(e) => e.stopPropagation()} // Prevents the click event from reaching the card
              >
                Manage
              </Button>
            </div>
          </Stack>
        </Stack>

        {franchise.status === "blocked" && (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 0, 0, 0.5)", // Red overlay
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" style={{ color: "#fff", fontWeight: "bold" }}>
              Currently Blocked
            </Typography>
            <BlockIcon style={{ color: "#fff", fontSize: "40px" }} />
          </div>
        )}
      </Card>

      {showDetails && (
        <FranchiseDetails franchise={franchise} onClose={() => setShowDetails(false)} />
      )}

      {open && (
        <EditDialog
          open={open}
          setOpen={setOpen}
          franchiseData={franchise}
          franchiseId={franchise._id}
        />
      )}
    </>
  );
};

FranchiseCard.propTypes = {
  franchise: PropTypes.object.isRequired,
};
