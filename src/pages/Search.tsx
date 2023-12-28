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
import { followUser } from "../redux/slices/userSlice";

type Props = {};

const Search = (props: Props) => {
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // const filteredUsers = (users || []).filter((item) =>
  //   item?.username?.toLowerCase().includes(search.toLowerCase())
  // );
  let localuser = JSON.parse(localStorage.getItem("loggedInUser"));
  const filteredUsers = (users || []).filter(
    (item) =>
      item?.username?.toLowerCase().includes(search.toLowerCase()) &&
      item.username !== localuser.username
  );
  const handleFollow = (userId) => {
    dispatch(followUser(userId))
      .then(() => {
        console.log("User followed successfully!");
      })
      .catch((error) => {
        console.error("Failed to follow user:", error);
      });
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
        <div style={{ position: "relative", width: "60vw" }}>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              const inputValue = e.target.value;
              setSearch(inputValue);
              setShowResults(!!inputValue);
            }}
            style={{
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#F9FAFB",
              width: "100%",
              height: "30px",
              marginBottom: "20px",
              padding: "0 6px ",
            }}
          />{" "}
          <SearchIcon
            style={{
              position: "absolute",
              color: "#8A89C0",
              right: "0px",
              top: "4px",
            }}
          />
        </div>
        {filteredUsers.map((elem) => {
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
                {" "}
                <div
                  style={{
                    minWidth: "50px",
                    height: "50px",
                    backgroundColor: "#E2E8F0",
                    borderRadius: "50%",
                    position: "absolute",

                    left: "0",
                  }}
                ></div>
                <div
                  style={{ width: "30%", position: "absolute", left: "70px" }}
                >
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
                  onClick={() => {
                    handleFollow(elem.id);
                  }}
                >
                  Follow
                </button>
              </div>
            </Container>
          );
        })}
      </Container>
    </>
  );
};

export default Search;
