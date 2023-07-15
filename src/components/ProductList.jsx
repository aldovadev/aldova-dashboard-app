import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const AddButton = styled(Link)`
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3273dc;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    background-color: #2768c4;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background-color: #f5f5f5;
    font-weight: bold;
    padding: 0.5rem;
  }

  td {
    padding: 0.5rem;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

const EditButton = styled(Link)`
  display: inline-block;
  margin-right: 10px;
  padding: 0.3rem 0.5rem;
  background-color: #209cee;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    background-color: #187dbc;
  }
`;

const DeleteButton = styled.button`
  display: inline-block;
  margin-left: 10px;
  padding: 0.3rem 0.5rem;
  background-color: #ff3860;
  color: #fff;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #e61c4b;
  }
`;

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
    console.log(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    getProducts();
  };

  return (
    <div style={{ paddingLeft: "30px" }}>
      <Title>LIST OF PRODUCTS</Title>
      <AddButton to="/products/add">ADD NEW</AddButton>
      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.uuid}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.user.name}</td>
              <td>
                <EditButton to={`/products/edit/${product.uuid}`}>
                  Edit
                </EditButton>
                <DeleteButton onClick={() => deleteProduct(product.uuid)}>
                  Delete
                </DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;
