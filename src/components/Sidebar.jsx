import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  background-color: #333;
  color: #fff;
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

  &.active {
    a {
      color: tomato;
    }
  }
`;

const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;

  &:hover {
    color: tomato;
  }

  &.active,
  &.active:hover {
    color: tomato;
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

const LoadingScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  z-index: 9999;
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const handleMenuClick = async (menu) => {
    setIsLoading(true);

    // Simulating loading time
    await Promise.all([
      new Promise((resolve) => setTimeout(resolve, 2000)), // Simulating additional loading time if needed
    ]);

    setIsLoading(false);
  };

  const isAdmin = user && user.role === "admin";

  return (
    <StyledSidebar>
      <ContainerLogo>
        <NavLink to="/dashboard">
          <Logo src={logo} alt="logo" />
        </NavLink>
      </ContainerLogo>
      <MenuLabel>MENU</MenuLabel>
      <MenuList>
        <MenuItem
          className={location.pathname === "/dashboard" ? "active" : ""}
          onClick={() => handleMenuClick("dashboard")}
        >
          <MenuLink to={"/dashboard"}>
            <IoHomeOutline /> Dashboard
          </MenuLink>
        </MenuItem>
      </MenuList>
      <MenuList>
        <MenuItem
          className={location.pathname === "/products" ? "active" : ""}
          onClick={() => handleMenuClick("products")}
        >
          <MenuLink to={"/products"}>
            <IoPricetagOutline /> Products
          </MenuLink>
        </MenuItem>
      </MenuList>
      <MenuList>
        <MenuItem
          className={location.pathname === "/graphic" ? "active" : ""}
          onClick={() => handleMenuClick("graphic")}
        >
          <MenuLink to={"/graphic"}>
            <IoBarChartOutline /> Graphic
          </MenuLink>
        </MenuItem>
      </MenuList>
      {isAdmin && (
        <>
          <MenuList>
            <MenuItem
              className={location.pathname === "/users" ? "active" : ""}
              onClick={() => handleMenuClick("users")}
            >
              <MenuLink to={"/users"}>
                <IoPersonOutline /> Users
              </MenuLink>
            </MenuItem>
          </MenuList>
          <MenuList>
            <MenuItem
              className={location.pathname === "/report" ? "active" : ""}
              onClick={() => handleMenuClick("report")}
            >
              <MenuLink to={"/report"}>
                <IoNewspaperOutline /> Report
              </MenuLink>
            </MenuItem>
          </MenuList>
        </>
      )}
      <MenuLabel>SETTINGS</MenuLabel>
      <MenuList>
        <MenuItem>
          <LogoutButton onClick={logout}>
            <IoLogOutOutline style={{ marginRight: "8px" }} /> Logout
          </LogoutButton>
        </MenuItem>
      </MenuList>
      {isLoading && <LoadingScreen>Loading...</LoadingScreen>}
    </StyledSidebar>
  );
};

export default Sidebar;
