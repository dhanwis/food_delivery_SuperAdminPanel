import PropTypes from "prop-types";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";

import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { usePopover } from "src/hooks/use-popover";
import { AccountPopover } from "./account-popover";
import { useAuth } from "src/hooks/use-auth";
import { adminImageUrl } from "src/utils/constant/urls";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { user } = useAuth();

  let full_name = user?.adminData ? `${user.adminData.fname} ${user.adminData.lname}` : "Admin";

  //let phone_number = user?.adminData?phone_number ? user.adminData.phone_number : "";
  let profile_image = user?.adminData?.adminImg || null;

  //const user = { fname: "shamla" };

  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  //const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const accountPopover = usePopover();

  const getGreeting = () => {
    const hour = new Date().getHours();
    let greeting;

    if (hour >= 5 && hour < 12) {
      greeting = "Good morning";
    } else if (hour >= 12 && hour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }

    return greeting;
  };

  let greeting = getGreeting();
  //const userName = "Mr./Mrs. Admin";

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) => alpha(theme.palette.background.default, 10),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
          border: "1px solid rgba(0, 0, 0, 0.1)", //
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}

            <Tooltip title="Greetings" arrow>
              <div className="greeting-container">
                <h4 className="greeting-text">
                  {greeting}{" "}
                  <span style={{ textDecoration: "underline", color: "#4338CA" }}>{full_name}</span>
                </h4>
              </div>
            </Tooltip>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            {/* <Tooltip title="Contacts">
              <IconButton>
                <SvgIcon fontSize="small">
                  <UsersIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip> */}
            <Tooltip title="Notifications">
              <IconButton>
                <Badge badgeContent={4} color="success" variant="dot">
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>

            <Stack
              direction="row"
              spacing={1.25}
              alignItems="center"
              onClick={accountPopover.handleOpen}
            >
              <Avatar
                ref={accountPopover.anchorRef}
                sx={{
                  cursor: "pointer",
                  height: 40,
                  width: 40,
                }}
                src={profile_image}
              />
              <Stack>
                <Typography variant="h6" style={{ cursor: "pointer" }}>
                  {full_name}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
        full_name={full_name}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
