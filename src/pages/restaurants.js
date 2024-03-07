import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Card,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import OrderTable, { rows } from "./OrdersTable";
import { useState } from "react";
import { RestaurantsSearch } from "./restaurants-search";

const Page = () => {
  const rowsPerPage = 5;
  const [page, setPage] = useState(0);

  const startIndex = page * rowsPerPage; // which is eg: (2*5 == 10)
  const endIndex = startIndex + rowsPerPage;

  const displayedRows = rows.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  return (
    <>
      <Head>
        <title>Restaurants | Devias Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Restaurants</Typography>
                {/* <Stack alignItems="center" direction="row" spacing={1}> Import & export buttons are hidden
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <RestaurantsSearch />

            <Grid item xs={12} md={7} lg={8}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h5">Top Restaurants </Typography>
                </Grid>
                <Grid item />
              </Grid>
              <Card sx={{ mt: 2 }} content={false}>
                <OrderTable displayedRows={displayedRows} />
              </Card>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={Math.ceil(rows.length / rowsPerPage)}
                page={page + 1}
                onChange={handlePageChange}
                size="large"
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
