import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Login") {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          console.log(response.data.message);
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [token]);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-20 gap-4 text-gray-800 border rounded-sm px-10 py-10 bg-sky-50 shadow-lg"
    >
      <div className="inline-flex bg-sky-50 items-center gap-2 mb-2 mt-10">
        <p className="prata-regular bg-sky-50 text-3xl">{currentState}</p>
        <hr className="border-none  h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState == "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800 bg-white"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border bg-white border-gray-800 "
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border bg-white border-gray-800 "
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px] bg-sky-50">
        <p className="cursor-pointer bg-sky-50">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer  bg-sky-50"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create account
          </p>
        ) : (
          <p
            className="cursor-pointer bg-sky-50"
            onClick={() => setCurrentState("Login")}
          >
            Login Here
          </p>
        )}
      </div>
      <button className=" bg-green-900 text-white font-light px-10 py-2 mt-4 rounded-md ">
        {currentState === "Login" ? "Sign in" : "Sign up"}
      </button>
    </form>
  );
};

export default Login;
