import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import styled from "styled-components";
import logo from "../logo.png";

const HeroSection = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const LoginForm = styled.form`
  width: 400px;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  .title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .has-text-centered {
    text-align: center;
  }

  .field {
    margin-bottom: 1.5rem;
  }

  .label {
    font-weight: bold;
  }

  .control {
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #cccccc;
      border-radius: 4px;
    }
  }

  .button {
    width: 100%;
    padding: 0.5rem;
    background-color: #4caf50;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 1rem;
`;

const ContainerLogo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-bottom: 5px;
`;

const Logo = styled.img`
  width: auto;
  height: 100px;
  margin: 0px 50px;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const handleAuth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <HeroSection>
      <LoginForm onSubmit={handleAuth}>
        {isError && <ErrorMessage>{message}</ErrorMessage>}
        <ContainerLogo>
          <Logo src={logo} alt="logo" />
        </ContainerLogo>
        <h1 className="title" style={{ color: "tomato" }}>
          Login Dashboard
        </h1>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
          </div>
        </div>
        <div className="field mt-5">
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
      </LoginForm>
    </HeroSection>
  );
};

export default Login;
