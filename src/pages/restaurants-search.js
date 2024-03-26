import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon, Grid, Typography } from "@mui/material";

export const RestaurantsSearch = ({ handleSearchChange }) => (
  <Card sx={{ p: 2 }}>
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Typography variant="h5" color={"black"} sx={{ marginBottom: "1rem" }}>
          Restaurants Belongs to Each Franchise:
        </Typography>
      </Grid>
      <Grid item />
    </Grid>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search Restaurants"
      onChange={handleSearchChange}
      startAdornment={
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      }
      sx={{ maxWidth: 500 }}
    />
  </Card>
);
