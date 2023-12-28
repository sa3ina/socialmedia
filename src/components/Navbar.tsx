import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#FEFEFE",

        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: 0,
        borderBottom: "1px solid #F1F5F8",

        padding: { xl: "0 30px", lg: "0 30px", md: "0", xs: "0", sm: "0" },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            <Box style={{ marginLeft: 0 }}>
              <Link
                to="/home"
                style={{
                  textDecoration: "none",
                  fontSize: "28px",
                  color: "#545D6B",
                  fontFamily: "Dancing Script",
                }}
              >
                {/* <img
                  src="https://www.pngall.com/wp-content/uploads/14/Pink-Bow-No-Background.png"
                  alt="Logo"
                  style={{
                    maxWidth: "30px",

                    height: "auto",
                    // transform: "rotate(340deg)",
                    position: "absolute",
                    top: "30px",
                    left: "-10px",
                  }}
                />{" "} */}
                Micom
              </Link>
            </Box>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#8A89C0" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/notif"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Typography textAlign="center">Notification</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                  <Typography textAlign="center">Friends</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/profile"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Typography textAlign="center">Profile</Typography>{" "}
                </Link>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/direct"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Typography textAlign="center">Messages</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to="/notif">
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: "900",
                  "&:hover": {
                    color: "grey",
                  },
                }}
              >
                <CircleNotificationsIcon
                  style={{ color: "#8A89C0", fontSize: "30px" }}
                />
              </Button>
            </Link>
            <Link to="/direct">
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: "900",
                  "&:hover": {
                    color: "grey",
                  },
                }}
              >
                <MailOutlineIcon
                  style={{ color: "#8A89C0", fontSize: "30px" }}
                />
              </Button>
            </Link>
            <Link to="/">
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "#8A89C0",
                  display: "block",
                  fontWeight: "700",
                  "&:hover": {
                    color: "grey",
                  },
                }}
              >
                <PeopleIcon style={{ color: "#8A89C0", fontSize: "30px" }} />
              </Button>
            </Link>
            <Link to="/profile">
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "#8A89C0",
                  display: "block",
                  fontWeight: "700",
                }}
              >
                <AccountCircleIcon style={{ fontSize: "30px" }} />
              </Button>
            </Link>
            <Link to="/search">
              <Button
                sx={{
                  my: 2,
                  color: "#8A89C0",
                  fontWeight: "700",
                }}
              >
                <div
                  style={{
                    borderRadius: "10px",
                    position: "relative",
                    border: "none",
                    backgroundColor: "#E2E8F0",
                    width: "170px",
                    height: "30px",
                    marginBottom: "4px",
                  }}
                >
                  {" "}
                </div>
                <SearchIcon
                  style={{
                    color: "#8A89C0",
                    position: "absolute",
                    right: "15px",
                  }}
                />
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
