import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import * as XLSX from "xlsx";
import animasi from "../report.gif";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-right: 1rem;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3273dc;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 20px;
`;

const Dropdown = styled.select`
  padding: 0.5rem;
  width: 300px;
`;

const Animation = styled.img`
  width: auto;
  height: 400px;
  margin: 30px 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 30px;
`;

const ReportData = () => {
  const [selectedOption, setSelectedOption] = useState("productlist");
  const [data, setData] = useState([""]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  // setData(products);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === "userlist") {
      setData(products);
    } else {
      setData(users);
    }
    console.log(e.target.value);
    console.log(data);
  };

  const exportToExcel = async () => {
    try {
      if (selectedOption === "userlist") {
        const workbook = XLSX.utils.book_new();
        const worksheetData = users.map((user, index) => [
          index + 1,
          user.name,
          user.email,
          user.role,
        ]);
        const worksheet = XLSX.utils.aoa_to_sheet([
          ["No", "Name", "Email", "Role"],
          ...worksheetData,
        ]);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
        XLSX.writeFile(workbook, `${selectedOption}.xlsx`);
      } else {
        const workbook = XLSX.utils.book_new();
        const worksheetData = products.map((product, index) => [
          index + 1,
          product.name,
          product.price,
          product.user.name,
        ]);
        const worksheet = XLSX.utils.aoa_to_sheet([
          ["No", "Name", "Price", "Created By"],
          ...worksheetData,
        ]);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
        XLSX.writeFile(workbook, `${selectedOption}.xlsx`);
      }
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  return (
    <Container>
      <div>
        <Animation src={animasi} alt="loading..." />
      </div>
      <div>
        <Dropdown value={selectedOption} onChange={handleOptionChange}>
          <option value="productlist">Product List</option>
          <option value="userlist">User List</option>
        </Dropdown>
        <Button onClick={exportToExcel}>Export to Excel</Button>
      </div>
    </Container>
  );
};

export default ReportData;
