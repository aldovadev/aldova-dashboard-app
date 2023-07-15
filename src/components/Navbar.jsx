import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo.png";
import styled from "styled-components";

const StyledNavbar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem 3rem;
`;

const NavbarBrand = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: auto;
  height: 40px;
`;

const Navbar = () => {
  return (
    <StyledNavbar role="navigation" aria-label="main navigation">
      <NavbarBrand>
        <NavLink to="/dashboard">
          <Logo src={logo} alt="logo" />
        </NavLink>
      </NavbarBrand>
    </StyledNavbar>
  );
};

export default Navbar;
