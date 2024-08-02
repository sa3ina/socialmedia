//@ts-nocheck
import React from "react";
import { Grid } from "@mui/material";
type Props = {};
import { Formik } from "formik";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const Register = (props: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {" "}
        <Grid item xs={12} md={6} sm={10}>
          <Formik
            initialValues={{ username: "", password: "", email: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.username) {
                errors.username = "required";
              }

              if (!values.email) {
                errors.email = "required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "invalid email address";
              }

              if (!values.password) {
                errors.password = "required";
              } else if (values.password.length < 8) {
                errors.password = "too short";
              }

              return errors;
            }}
            onSubmit={(values) => {
              console.log(values);
              let id = uuidv4();
              let obj = {
                id,
                ...values,
              };
              axios
                .post("https://usersapi-2rke.onrender.com/users/", obj)
                .then((res) => {
                  console.log(res);

                  if (res.status == 201) {
                    alert("this info is already used by someone");
                  }
                  if (res.status == 200) {
                    alert("succesful registration");
                    navigate("/");
                  }
                });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <h1>Sign Up</h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <PersonIcon style={{ fontSize: "20px" }} />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <input
                      type="username"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      placeholder="Username"
                      style={{
                        width: "300px",
                        padding: "10px",
                        border: "none",
                        borderBottom: "1px solid black",
                      }}
                    />
                    {errors.username && touched.username && (
                      <span
                        style={{
                          color: "#bf0603",
                          display: "block",
                          marginLeft: "5px",
                        }}
                      >
                        {errors.username}
                      </span>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <EmailIcon style={{ fontSize: "20px" }} />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Email"
                      style={{
                        width: "300px",
                        padding: "10px",
                        border: "none",
                        borderBottom: "1px solid black",
                      }}
                    />
                    {errors.email && touched.email && (
                      <span
                        style={{
                          color: "#bf0603",
                          display: "block",
                          marginLeft: "5px",
                        }}
                      >
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <LockIcon style={{ fontSize: "20px" }} />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Password"
                      style={{
                        width: "300px",
                        padding: "10px",
                        border: "none",
                        borderBottom: "1px solid black",
                      }}
                    />{" "}
                    {errors.password && touched.password && (
                      <span
                        style={{
                          color: "#bf0603",
                          display: "block",
                          marginLeft: "5px",
                        }}
                      >
                        {errors.password}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "5px" }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      padding: "10px 60px",
                      backgroundColor: "#2B67B2",
                      border: "none",
                      borderRadius: "20px",
                      color: "white",
                      width: "330px",
                      cursor: "pointer",
                    }}
                  >
                    Register
                  </button>
                </div>{" "}
                <div
                  style={{
                    display: "flex",
                    width: "330px",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      height: "1px",
                      backgroundColor: "grey",
                    }}
                  ></div>
                  <p>or</p>
                  <div
                    style={{
                      flex: "1",
                      height: "1px",
                      backgroundColor: "grey",
                    }}
                  ></div>
                </div>
                <Link to="/">
                  <p>I am already member</p>
                </Link>
              </form>
            )}
          </Formik>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sm={10}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <img
            height={"auto"}
            src="https://github.com/deepsingh9868/full-stack-todo-app-/blob/main/client/src/images/signup1.jpg?raw=true"
            alt=""
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
