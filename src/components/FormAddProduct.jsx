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

const Content = styled.div`
  padding: 1rem;
`;

const StyledForm = styled.form`
  .has-text-centered {
    text-align: center;
  }

  .label {
    font-weight: bold;
  }

  .input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .button {
    margin-top: 1rem;
    width: 100%;
  }
`;

const FormAddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(BASE_URL + "products", {
        name: name,
        price: price,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div style={{ paddingLeft: "30px", borderRadius: "30px", height: "80vh" }}>
      <Title>ADD NEW PRODUCT</Title>
      <Card className="card">
        <Content className="card-content">
          <StyledForm onSubmit={saveProduct}>
            <p className="has-text-centered">{msg}</p>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product Name"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Price</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button type="submit" className="button is-success">
                  Save
                </button>
              </div>
            </div>
          </StyledForm>
        </Content>
      </Card>
    </div>
  );
};

export default FormAddProduct;
