import Head from "next/head";
import { useState, useEffect } from "react";
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
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { FranchiseCard } from "src/sections/franchisees/franchise-card";
import { FranchiseSearch } from "src/sections/franchisees/franchise-search";
import AddFranchise from "./AddFranchise";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useFranchise } from "src/contexts/franchise-context";

export const franchisesData = [
  {
    id: "2569ce0d517a7f06d3ea1f24",
    createdAt: "27/03/2019",
    description:
      "Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.",
    logo: "/assets/logos/logo-dropbox.png",
    name: "Dropbox",
    restaurants: "594",
    location: "Chalode",
    phoneNumber: 1234569870,
  },
  {
    id: "ed2b900870ceba72d203ec15",
    createdAt: "31/03/2019",
    description:
      "Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.",
    logo: "/assets/logos/logo-medium.png",
    name: "Medium Corporation",
    restaurants: "625",
    location: "Chakarakal",
    phoneNumber: 1234569870,
  },
  {
    id: "a033e38768c82fca90df3db7",
    createdAt: "03/04/2019",
    description:
      "Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.",
    logo: "/assets/logos/logo-slack.png",
    name: "Slack",
    restaurants: "857",
    location: "Kannur",
    phoneNumber: 1234569870,
  },
  {
    id: "1efecb2bf6a51def9869ab0f",
    createdAt: "04/04/2019",
    description: "Lyft is an on-demand transportation company based in San Francisco, California.",
    logo: "/assets/logos/logo-lyft.png",
    name: "Lyft",
    restaurants: "406",
    location: "Uliyil",
    phoneNumber: 1234569870,
  },
  {
    id: "1ed68149f65fbc6089b5fd07",
    createdAt: "04/04/2019",
    description: "GitHub is a web-based hosting service for version control of code using Git.",
    logo: "/assets/logos/logo-github.png",
    name: "GitHub",
    restaurants: "835",
    location: "Kuthuparambu",
    phoneNumber: 1234569870,
  },
  {
    id: "5dab321376eff6177407e887",
    createdAt: "04/04/2019",
    description:
      "Squarespace provides software as a service for website building and hosting. Headquartered in NYC.",
    logo: "/assets/logos/logo-squarespace.png",
    name: "Squarespace",
    restaurants: "835",
    location: "Irikkur",
    phoneNumber: 1234569870,
  },

  {
    id: "2569ce0d517a7f06d3ea1f24",
    createdAt: "27/03/2019",
    description:
      "Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.",
    logo: "/assets/logos/logo-dropbox.png",
    name: "Dropbox",
    restaurants: "594",
    location: "Anjarakandy",
    phoneNumber: 1234569870,
  },
  {
    id: "1ed68149f65fbc6089b5fd07",
    createdAt: "04/04/2019",
    description: "GitHub is a web-based hosting service for version control of code using Git.",
    logo: "/assets/logos/logo-github.png",
    name: "GitHub",
    restaurants: "835",
    location: "Mattanur",
    phoneNumber: 1234569870,
  },
  {
    id: "ed2b900870ceba72d203ec15",
    createdAt: "31/03/2019",
    description:
      "Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.",
    logo: "/assets/logos/logo-medium.png",
    name: "Medium Corporation",
    restaurants: "625",
    location: "Kodali",
    phoneNumber: 1234569870,
  },
  {
    id: "5dab321376eff6177407e887",
    createdAt: "04/04/2019",
    description:
      "Squarespace provides software as a service for website building and hosting. Headquartered in NYC.",
    logo: "/assets/logos/logo-squarespace.png",
    name: "Squarespace",
    restaurants: "835",
    location: "Mahe",
    phoneNumber: 1234569870,
  },

  {
    id: "1efecb2bf6a51def9869ab0f",
    createdAt: "04/04/2019",
    description: "Lyft is an on-demand transportation company based in San Francisco, California.",
    logo: "/assets/logos/logo-lyft.png",
    name: "Lyft",
    restaurants: "406",
    location: "Thalassery",
    phoneNumber: 1234569870,
  },
  {
    id: "a033e38768c82fca90df3db7",
    createdAt: "03/04/2019",
    description:
      "Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.",
    logo: "/assets/logos/logo-slack.png",
    name: "Slack",
    restaurants: "857",
    location: "iritty",
    phoneNumber: 1234569870,
  },
];

const Page = () => {
  const rowsPerPage = 6;
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [franchiseData, setFranchiseData] = useState([]);
  const { fetchFranchises } = useFranchise();
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchFranchises();
      setFranchiseData(fetchedData);
    };
    fetchData();
    setIsLoading(false);
  }, [fetchFranchises]); // Make sure to include fetchFranchises in the dependency array

  // const startIndex = page * rowsPerPage; // which is eg: (2*5 == 10)
  // const endIndex = startIndex + rowsPerPage;

  // const displayedFranchise = franchiseData.slice(startIndex, endIndex);

  // const handlePageChange = (event, newPage) => {
  //   setPage(newPage - 1);
  // };

  // // Filter franchises based on search query
  // const filteredFranchises = franchiseData.filter((franchise) =>
  //   franchise.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // const handleSearchChange = (event) => {
  //   setSearchQuery(event.target.value);
  //   setPage(0); // Reset page when search query changes
  // };

  // Filter franchises based on search query
  const filteredFranchises = franchiseData.filter((franchise) =>
    franchise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFranchises = filteredFranchises.length;
  const totalPages = Math.ceil(totalFranchises / rowsPerPage);

  // Calculate displayed franchises based on pagination
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalFranchises);

  const displayedFranchise = filteredFranchises.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset page when search query changes
  };

  return (
    <>
      <Head>
        <title>Franchisees | Devias Kit</title>
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
                <Typography variant="h4">Franchisees</Typography>
              </Stack>
              <div>
                <Button
                  onClick={() => setOpen(!open)}
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
            <FranchiseSearch handleSearchChange={handleSearchChange} />
            <Grid container spacing={3}>
              {isLoading
                ? Array.from({ length: displayedFranchise.length }).map((_, index) => (
                    <Grid xs={12} md={6} lg={4} key={index}>
                      <Skeleton width={210} height={118} duration={1.5} />
                    </Grid>
                  ))
                : displayedFranchise.map((franchise) => (
                    <Grid xs={12} md={6} lg={4} key={franchise.id}>
                      <FranchiseCard franchise={franchise} />
                    </Grid>
                  ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* <Pagination
                count={Math.ceil(franchisesData.length / rowsPerPage)}
                page={page + 1}
                onChange={handlePageChange}
                size="large"
              /> */}

              <Pagination
                count={totalPages}
                page={page + 1}
                onChange={handlePageChange}
                size="large"
              />
            </Box>
          </Stack>
        </Container>

        <AddFranchise open={open} setOpen={setOpen} />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
