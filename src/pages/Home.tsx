//@ts-nocheck
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import App from "../App";
import PhotoIcon from "@mui/icons-material/Photo";
// import CreateIcon from "@mui/icons-material/Create";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import { Typography, Card, CardContent } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageIcon from "@mui/icons-material/Message";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchUsers } from "../redux/slices/userSlice";
import { useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { v4 as uuidv4 } from "uuid";
import { addPost } from "../redux/slices/userSlice";
type Props = {};

const Home = (props: Props) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "8px",
    boxShadow:
      " rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [title, setTitle] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const handleCreatePost = () => {
    let localuser = JSON.parse(localStorage.getItem("loggedInUser"));

    const newItem = {
      title: title,
      imgSRC: imageSrc,
      postId: uuidv4(),
      userName: localuser.username,
    };
    dispatch(addPost(newItem));
    setTitle("");
    setImageSrc("");
    handleClose();
  };
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log(token);
  // //   axios("http://localhost:8080/home", {
  // //     headers: {
  // //       Authorization: `bearer ${token}`,
  // //     },
  // //   }).then((res) => {
  // //     console.log(res.data);
  // //     setData(res.data);
  // //   });
  // // }, []);
  // axios("https://usersapi-2rke.onrender.com/users").then((res) => {
  //   setData(res.data);
  // });
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  let localuser = JSON.parse(localStorage.getItem("loggedInUser") || "");

  const foundUser = users.find(
    (user) =>
      user?.username?.toLowerCase() === localuser?.username?.toLowerCase()
  );
  useEffect(() => {
    if (users && users.length > 0 && localuser) {
      const filteredPosts = users
        .filter((user) => foundUser.following.includes(user.id))
        .flatMap((user) => user.posts);

      setUserData(filteredPosts);
    }
  }, [dispatch, users]);

  const followingIds = foundUser?.following;

  const followingUsers = users.filter((user) => followingIds.includes(user.id));
  return (
    <>
      <Navbar />
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ textAlign: "center" }}
            >
              Create Post
            </Typography>
            <Divider style={{ marginBottom: "10px" }} />

            <textarea
              style={{ width: "100%", border: "none", padding: "5px" }}
              name=""
              id=""
              cols="30"
              rows="10"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you have in mind ?"
            ></textarea>
            <div style={{ display: "flex", gap: "130px" }}>
              <button
                style={{
                  backgroundColor: "white",
                  borderRadius: "7px",
                }}
              >
                img{" "}
                <input
                  style={{ border: "none" }}
                  value={imageSrc}
                  onChange={(e) => setImageSrc(e.target.value)}
                  type="text"
                />
              </button>
              <button
                style={{
                  backgroundColor: "#3c82f6",
                  color: "white",
                  border: "none",
                  padding: "4px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={handleCreatePost}
              >
                Create
              </button>
            </div>
          </Box>
        </Modal>
      </div>
      <Container
        maxWidth="100%"
        style={{
          backgroundColor: "#F9FAFB",
          paddingTop: "20px",
          minHeight: "90vh",
        }}
      >
        <Grid
          container
          sx={{
            height: "100%",
          }}
        >
          <Grid xl={8} lg={8} md={12} xs={12} sm={12}>
            {" "}
            <Container
              sx={{
                padding: {
                  xl: "0 60px",
                  lg: "0 60px",
                  xs: "0",
                  sm: "0",
                  md: "0",
                },
              }}
            >
              {/* There would be stories part */}
              {/* <Container
                sx={{
                  display: {
                    xl: "flex",
                    lg: "flex",
                    xs: "none",
                    sm: "none",
                    md: "flex",
                  },
                }}
                style={{
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#E2E8F0",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#E2E8F0",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#E2E8F0",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#E2E8F0",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#E2E8F0",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#E2E8F0",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#E2E8F0",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#E2E8F0",
                    borderRadius: "50%",
                  }}
                ></div>
              </Container> */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "6px",
                  padding: "10px",
                  display: "flex",
                  boxShadow:
                    " rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                  marginBottom: "40px",
                }}
              >
                <button
                  style={{
                    width: "40vw",
                    padding: "5px",
                    backgroundColor: "#F1F5F8",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={handleOpen}
                >
                  What do you have in mind?
                </button>
                <button
                  style={{
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#fff0f3",
                    padding: "2px 5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleOpen}
                >
                  <PhotoIcon style={{ color: "#fb6f92" }} />
                </button>
                <button
                  style={{
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#ECF7FF",
                    padding: "2px 5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  // onClick={handleOpen}
                >
                  <HistoryToggleOffIcon style={{ color: "#5fa8d3" }} />
                </button>
              </div>
              {userData.map((elem) => {
                const user = users.find((x) => x.username === elem.userName);
                return (
                  <Card style={{ position: "relative", marginBottom: "23px" }}>
                    <CardContent style={{ padding: "60px 0 20px 0" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "absolute",
                          left: "10px",
                          top: "10px",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#E2E8F0",
                            borderRadius: "50%",
                          }}
                        ></div>
                        <Link
                          to={`/${user?.id}`}
                          style={{
                            color: "black",
                            textDecoration: "none",
                          }}
                        >
                          <p>{elem.userName}</p>
                        </Link>
                      </div>

                      <img
                        src={elem.imgSRC}
                        style={{
                          width: "100%",
                          height: "480px",
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
                        {elem.title}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </Container>
          </Grid>
          <Grid xl={4} lg={4} md={12} xs={12} sm={12}>
            {" "}
            <Card
              sx={{
                position: "fixed",
                display: {
                  xl: "flex",
                  lg: "flex",
                  md: "none",
                  sm: "none",
                  xs: "none",
                },
              }}
            >
              <CardContent style={{ width: "390px" }}>
                <Typography style={{ fontSize: "20px", marginBottom: "10px" }}>
                  Friends
                </Typography>
                {followingUsers.map((elem) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        gap: "120px",
                        marginBottom: "10px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "10px" }}>
                        {" "}
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#E2E8F0",
                            borderRadius: "50%",
                          }}
                        ></div>
                        <div style={{ width: "150px" }}>
                          {" "}
                          <Link
                            to={`/${elem.id}`}
                            style={{
                              color: "black",
                              textDecoration: "none",
                            }}
                          >
                            {elem.username}
                          </Link>
                          <Typography>
                            {elem.follower.length} follower
                          </Typography>
                        </div>
                      </div>
                      <div>
                        <button
                          style={{
                            marginTop: "8px",
                            backgroundColor: "#E0F2FF",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Chat
                        </button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
