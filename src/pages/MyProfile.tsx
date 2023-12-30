import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Grid, Card, CardContent, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchUsers } from "../redux/slices/userSlice";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageIcon from "@mui/icons-material/Message";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
const MyProfile = () => {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("loggedInUser")) {
      setLogin(true);
    } else {
      navigate("/");
    }
  }, []);
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  let localuser = JSON.parse(localStorage.getItem("loggedInUser") || "");
  console.log(localuser);
  const { id } = useParams();
  const navigate = useNavigate();
  const user =
    users &&
    users.find(
      (user) =>
        user?.username?.toLowerCase() == localuser?.username?.toLowerCase()
    );

  return (
    <>
      <Navbar />
      <Container
        style={{
          marginTop: "40px",
          width: "100vw",
        }}
      >
        <Link to="/search" style={{ color: "black" }}>
          <ArrowBackIcon
            style={{ position: "absolute", top: "20px", left: "50px" }}
          />
        </Link>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          gap="10px"
        >
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              justifyContent: "left",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                backgroundColor: "#E2E8F0",
                borderRadius: "50%",
              }}
            ></div>{" "}
            <Typography
              color="text.secondary"
              sx={{
                marginBottom: "10px",

                textAlign: "left",

                fontSize: "23px",
                fontWeight: "400",
              }}
            >
              {user?.username}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                marginBottom: "10px",
                textAlign: "left",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {user?.bio?.info}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                marginBottom: "10px",
                textAlign: "left",
                color: "#013566",
              }}
            >
              {user?.bio?.country}
            </Typography>
            <div style={{ display: "flex", gap: "20px" }}>
              {" "}
              <Link
                to="/followers"
                style={{ color: "black", textDecoration: "none" }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p>followers</p> <p>{user?.follower.length}</p>
                </div>{" "}
              </Link>
              <Link
                to="/following"
                style={{ color: "black", textDecoration: "none" }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p>following</p> <p>{user?.following.length}</p>
                </div>
              </Link>
            </div>
            <div style={{ gap: "10px" }}>
              <button
                style={{
                  padding: "6px 10px",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  marginRight: "5px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("loggedInUser");
                  setLogin(false);
                  navigate("/");
                }}
              >
                Log Out
              </button>
              <button
                style={{
                  padding: "5px 10px",
                  backgroundColor: "white",
                  color: "#089AF2",
                  border: "1px solid #089AF2",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            </div>
          </Container>

          <Grid container spacing={2}>
            {user?.posts.map((post) => (
              <Grid item xs={12} xl={4} md={4} sm={6} lg={4}>
                <Card style={{ position: "relative", marginBottom: "23px" }}>
                  <CardContent style={{ padding: "0px 0 20px 0" }}>
                    <img
                      src={post.imgSRC}
                      style={{
                        width: "100%",
                        height: "420px",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        width: "80px",
                        position: "absolute",
                        paddingTop: "10px",
                      }}
                    >
                      <FavoriteBorderIcon
                        style={{ color: "#780000", fontSize: "28px" }}
                      />

                      <MessageIcon
                        style={{ color: "grey", fontSize: "28px" }}
                      />
                    </div>
                    <Typography
                      color="text.secondary"
                      style={{
                        padding: "50px 0 0 10px",
                      }}
                    >
                      {post.title}
                    </Typography>
                  </CardContent>
                </Card>{" "}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MyProfile;
