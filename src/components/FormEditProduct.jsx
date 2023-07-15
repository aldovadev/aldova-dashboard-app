import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const Card = styled.div`
  box-shadow: none;
`;

const FormContent = styled.div`
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: "#f3f3f3";
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

const FormEditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setName(response.data.name);
        setPrice(response.data.price);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/products/${id}`, {
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
    <div
      style={{
        padding: "30px",
        borderRadius: "30px",
      }}
    >
      <Title>Edit Product</Title>
      <Card className="card is-shadowless">
        <FormContent className="card-content">
          <Form onSubmit={updateProduct}>
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
                  Update
                </button>
              </div>
            </div>
          </Form>
        </FormContent>
      </Card>
    </div>
  );
};

export default FormEditProduct;
