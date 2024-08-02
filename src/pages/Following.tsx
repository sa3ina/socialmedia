//@ts-nocheck
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import { fetchUsers } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { unfollowUser } from "../redux/slices/userSlice";
import { followUser } from "../redux/slices/userSlice";
type Props = {};

const Following = (props: Props) => {
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  let localuser = JSON.parse(localStorage.getItem("loggedInUser") || "");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, users]);
  const foundUser = users.find(
    (user) =>
      user?.username?.toLowerCase() === localuser?.username?.toLowerCase()
  );
  const followingIds = foundUser?.following;

  const followingUsers = users.filter((user) => followingIds.includes(user.id));
  console.log(followingUsers);

  const handleFollowToggle = (userId, isFollowing) => {
    if (isFollowing) {
      dispatch(unfollowUser(userId));
    } else {
      dispatch(followUser(userId));
    }
  };

  return (
    <>
      <Navbar />
      <Container
        maxWidth="xl"
        style={{
          paddingTop: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {followingUsers?.map((user) => {
          const isFollowing = followingIds && followingIds.includes(user.id);
          return (
            <Container
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "6px",
                padding: "10px",
                display: "flex",
                boxShadow:
                  " rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                marginBottom: "10px",
              }}
              sx={{
                width: {
                  xl: "60vw",
                  lg: "60vw",
                  xs: "100vw",
                  sm: "100vw",
                  md: "100vw",
                },
              }}
            >
              {" "}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  width: "100%",
                }}
              >
                <div
                  style={{ width: "30%", position: "absolute", left: "70px" }}
                >
                  {" "}
                  <Link
                    to={`/${user.id}`}
                    style={{
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    {user.username}
                  </Link>
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
                  onClick={() => handleFollowToggle(user.id, isFollowing)}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            </Container>
          );
        })}
      </Container>
    </>
  );
};

export default Following;
