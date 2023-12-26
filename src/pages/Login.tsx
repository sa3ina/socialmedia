import React from "react";
import { Grid } from "@mui/material";
type Props = {};
import { Formik } from "formik";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
const Login = (props: Props) => {
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
        <Grid
          item
          xs={12}
          md={6}
          sm={10}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <img
            height={"auto"}
            src="https://github.com/deepsingh9868/full-stack-todo-app-/blob/main/client/src/images/signin.jpg?raw=true"
            alt=""
          />
        </Grid>
        <Grid item xs={12} md={6} sm={10}>
          <Formik
            initialValues={{ username: "", password: "" }}
            validate={(values) => {
              const errors = {};
              // if (!values.username) {
              //   errors.username = "Required";
              // } else if (
              //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
              //     values.username
              //   )
              // ) {
              //   errors.username = "Invalid username address";
              // }
              return errors;
            }}
            onSubmit={(values, actions) => {
              console.log(values);
              axios.post("http://localhost:8080/login/", values).then((res) => {
                console.log(res.status);
                if (res.status == 200) {
                  localStorage.setItem("token", res.data);
                  navigate("/home");
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
                  alignItems: "left",
                  gap: "20px",

                  position: "relative",
                }}
              >
                <h1>Sign In</h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <PersonIcon style={{ fontSize: "20px" }} />
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
                  {errors.username && touched.username && errors.username}
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
                  />
                  {errors.password && touched.password && errors.password}
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
                    Login
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
                <Link to="/register">
                  <p>Create an account</p>
                </Link>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
