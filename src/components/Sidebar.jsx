import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoPersonOutline,
  IoPricetagOutline,
  IoHomeOutline,
  IoLogOutOutline,
  IoBarChartOutline,
  IoNewspaperOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import styled from "styled-components";
import logo from "../logo.png";

const StyledSidebar = styled.aside`
  background-color: #f5f5f5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuLabel = styled.p`
  font-weight: bold;
  margin-bottom: 1rem;
  margin-left: 20px;
  width: 80%;
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 1rem;
  margin-left: 20px;
  width: 80%;
`;

const MenuItem = styled.li`
  margin-bottom: 0.5rem;
`;

const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: #333;
  text-decoration: none;
  &:hover {
    color: #000;
  }
  svg {
    margin-right: 0.5rem;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  border: none;
  color: red;
  height: 25px;
  padding: 0px;
  font-size: 16px;
  cursor: pointer;
`;

const ContainerLogo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 30px;
`;

const Logo = styled.img`
  width: auto;
  height: 100px;
  margin: 0px 50px;
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <StyledSidebar>
      <ContainerLogo>
        <NavLink to="/dashboard">
          <Logo src={logo} alt="logo" />
        </NavLink>
      </ContainerLogo>
      <MenuLabel>MENU</MenuLabel>
      <MenuList>
        <MenuItem>
          <MenuLink to={"/dashboard"}>
            <IoHomeOutline /> Dashboard
          </MenuLink>
        </MenuItem>
      </MenuList>
      <MenuList>
        <MenuItem>
          <MenuLink to={"/products"}>
            <IoPricetagOutline /> Products
          </MenuLink>
        </MenuItem>
      </MenuList>
      {user && user.role === "admin" && (
        <MenuList>
          <MenuItem>
            <MenuLink to={"/users"}>
              <IoPersonOutline /> Users
            </MenuLink>
          </MenuItem>
        </MenuList>
      )}
      <MenuList>
        <MenuItem>
          <MenuLink to={"/graphic"}>
            <IoBarChartOutline /> Graphic
          </MenuLink>
        </MenuItem>
      </MenuList>
      <MenuList>
        <MenuItem>
          <MenuLink to={"/report"}>
            <IoNewspaperOutline /> Report
          </MenuLink>
        </MenuItem>
      </MenuList>
      <MenuLabel>SETTINGS</MenuLabel>
      <MenuList>
        <MenuItem>
          <LogoutButton onClick={logout}>
            <IoLogOutOutline style={{ marginRight: "8px" }} /> Logout
          </LogoutButton>
        </MenuItem>
      </MenuList>
    </StyledSidebar>
  );
};

export default Sidebar;
