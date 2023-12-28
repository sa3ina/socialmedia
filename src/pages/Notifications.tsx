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

type Props = {};

const Notifications = (props: Props) => {
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const userWithIdOne = users.find((user) => user.id === "2");

  const notificationsForIdOne = userWithIdOne?.notifications;

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
        {notificationsForIdOne?.map((notif) => {
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
                    to={`/${notif.id}`}
                    style={{
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    {notif.notifications}
                  </Link>
                </div>
              </div>
              <div>
                <button
                  style={{
                    marginTop: "8px",
                    backgroundColor: "#C1111F",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  Delete
                </button>
              </div>
            </Container>
          );
        })}
      </Container>
    </>
  );
};

export default Notifications;
