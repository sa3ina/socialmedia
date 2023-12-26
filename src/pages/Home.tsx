import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
type Props = {};

const Home = (props: Props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    axios("http://localhost:8080/home", {
      headers: {
        Authorization: `barear ${token}`,
      },
    }).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);
  return (
    <div>
      Home
      <>
        <ul>
          {data &&
            data.map((elem, i) => {
              return <li key={i}>{elem.username}</li>;
            })}
        </ul>
      </>
      <button>
        <Link to="/">Login</Link>
      </button>
      <button>
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
};

export default Home;
