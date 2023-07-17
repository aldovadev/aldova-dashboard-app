import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BASE_URL from "../app/store";

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const Card = styled.div`
  box-shadow: none;
`;

const FormContent = styled.div`
  padding: 1rem;
`;

const Form = styled.form`
  .has-text-centered {
    text-align: center;
  }

  .field {
    margin-bottom: 1rem;
  }

  .label {
    font-weight: bold;
  }

  .control {
    input,
    select {
      width: 100%;
      padding: 0.5rem;
    }
  }

  .select {
    position: relative;
    display: inline-block;

    &:after {
      content: "▼";
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }
  }

  .button {
    width: 100%;
  }
`;

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(BASE_URL + "users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });

      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div style={{ paddingLeft: "30px", borderRadius: "30px", height: "80vh" }}>
      <Title>ADD NEW USER</Title>
      <Card className="card is-shadowless">
        <FormContent className="card-content">
          <Form onSubmit={saveUser}>
            <p className="has-text-centered">{msg}</p>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>
            </div>
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
            <div className="field">
              <label className="label">Confirm Password</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  placeholder="******"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Role</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-success">
                  Save
                </button>
              </div>
            </div>
          </Form>
        </FormContent>
      </Card>
    </div>
  );
};

export default FormAddUser;
