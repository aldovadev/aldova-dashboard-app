import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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

const Userlist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  return (
    <div style={{ paddingLeft: "30px" }}>
      <Title>LIST OF USERS</Title>
      <AddButton to="/users/add">ADD NEW</AddButton>
      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <EditButton to={`/users/edit/${user.uuid}`}>Edit</EditButton>
                <DeleteButton onClick={() => deleteUser(user.uuid)}>
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

export default Userlist;
