import { Dialog, DialogContent, DialogTitle, Typography, Box } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const FranchiseDetails = ({ franchise, onClose }) => {
  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" color="primary">
          Franchise Details
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="h6" color="textSecondary">
            Franchise Name:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {franchise.name}
          </Typography>
        </Box>

        <Box mb={2} display="flex" alignItems="center">
          <Typography variant="h6" color="textSecondary" mr={2}>
            Status:
          </Typography>
          {franchise.status === "active" ? (
            <Box display="flex" alignItems="center">
              <Typography variant="body1" color="textPrimary" fontWeight="bold">
                Active
              </Typography>
              <CheckCircleOutlineIcon color="success" fontSize="small" ml={1} />
            </Box>
          ) : (
            <Box display="flex" alignItems="center">
              <Typography variant="body1" color="textPrimary" fontWeight="bold">
                Blocked
              </Typography>
              <BlockIcon color="error" fontSize="small" ml={1} />
            </Box>
          )}
        </Box>

        <Box mb={2}>
          <Typography variant="h6" color="textSecondary">
            About Franchise:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {franchise.description}
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="h6" color="textSecondary">
            Created At:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {franchise.createdAt}
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="h6" color="textSecondary">
            Phone:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {franchise.phoneNumber}
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="h6" color="textSecondary">
            Location:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {franchise.location}
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="h6" color="textSecondary">
            Total Restaurants:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {franchise.restaurants}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FranchiseDetails;
