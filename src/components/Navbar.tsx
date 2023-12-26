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
import { useEffect } from "react";

function Navbar() {
  const [search, setSearch] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  //   const dispatch = useDispatch();
  //   const { news, loading, error } = useSelector(
  //     (state: RootState) => state.news
  //   );
  //   let newsData = news;
  //   useEffect(() => {
  //     dispatch(fetchNews());
  //   }, [dispatch]);
  //   console.log(newsData);

  //   const filteredNews = newsData.filter((item) =>
  //     item.title.toLowerCase().includes(search.toLowerCase())
  //   );
  //   console.log(filteredNews);
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
        backgroundColor: "#1E293B",
        marginBottom: "30px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // padding: { xl: "0 30px", md: "0 30px" },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
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
                  fontSize: "20px",
                  color: "white",
                }}
              >
                Micom
                {/* <img
                  src="https://cdn.shopify.com/s/files/1/0558/6413/1764/files/Blue_Logo_Design_7_1024x1024.png?v=1677204656"
                  alt="Logo"
                  style={{ maxWidth: "150px", width: "100%", height: "auto" }}
                /> */}
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
                <Typography textAlign="center">Notification</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Friends</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>

              {/* <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">NewsLetter</Typography>
              </MenuItem> */}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                fontWeight: "900",
                "&:hover": {
                  color: "white",
                },
              }}
            >
              <CircleNotificationsIcon
                style={{ color: "#8A89C0", fontSize: "30px" }}
              />
            </Button>
            <Link to="/about">
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: "900",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                <PeopleIcon style={{ color: "#8A89C0", fontSize: "30px" }} />
              </Button>
            </Link>
            <Button
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "#8A89C0",
                display: "block",
                fontWeight: "700",
                "&:hover": {
                  color: "white",
                },
              }}
            >
              <AccountCircleIcon style={{ fontSize: "30px" }} />
            </Button>
            <Button>
              <input
                type="text"
                style={{
                  borderRadius: "10px",
                  borderWidth: "1px",
                  borderColor: "grey",
                }}
                // onChange={(e) => {
                //   setSearch(e.target.value);
                //   setShowResults(!!e.target.value);
                // }}
              />{" "}
              <SearchIcon style={{ color: "#8A89C0" }} />
            </Button>
            {/* <div
              style={{
                position: "absolute",
                top: "40px",
                left: "0",
                width: "100%",
                background: "white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                zIndex: "4556",
                color: "black",
                marginTop: "30px",
                display: showResults ? "block" : "none",
              }}
            >
              <ul>
                {filteredNews.map((result, index) => (
                  <a
                    href={result.url}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <li
                      style={{ listStyleType: "none", padding: "3px" }}
                      key={index}
                    >
                      {" "}
                      <SearchIcon style={{ height: "20px" }} />
                      {result.title}
                    </li>
                  </a>
                ))}
              </ul>
            </div> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
