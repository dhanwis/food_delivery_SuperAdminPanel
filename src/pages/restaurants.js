import { useEffect } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  Unstable_Grid2 as Grid,
  Card,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import OrderTable, { rows } from "./OrdersTable";
import { useState } from "react";
import { useFranchise } from "src/contexts/franchise-context";
import { RestaurantsSearch } from "./restaurants-search";

const Page = () => {
  const { fetchFranchises } = useFranchise();

  const [franchiseData, setFranchiseData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchFranchises();
      setFranchiseData(fetchedData);
    };
    fetchData();
    setIsLoading(false);
  }, [fetchFranchises]); // Make sure to include fetchFranchises in the dependency array

  const rowsPerPage = 10;
  const [page, setPage] = useState(0);

  //const displayedRows = franchiseData.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset page when search query changes
  };

  const filteredFranchise = franchiseData.filter((franchise) =>
    franchise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFranchises = filteredFranchise.length;
  const totalPages = Math.ceil(totalFranchises / rowsPerPage);

  // Calculate displayed franchises based on pagination
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalFranchises);

  const displayedFranchise = filteredFranchise.slice(startIndex, endIndex);

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
          background: "url('/pexels-ella-olsson-1640777.jpg')", // Change the path to your background image
          backgroundSize: "cover",
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <RestaurantsSearch handleSearchChange={handleSearchChange} />

            <Grid item xs={12} md={7} lg={8}>
              <Card sx={{ mt: 2 }} content={false}>
                <OrderTable displayedFranchise={displayedFranchise} />
              </Card>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={totalPages}
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
