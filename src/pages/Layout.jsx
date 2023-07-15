import React from "react";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  flex-wrap: wrap;
  padding: 30px;
`;

const SidebarContainer = styled.div`
  flex: 0 0 240px;
  background-color: #f5f5f5;
  margin: 10px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const ContentContainer = styled.div`
  flex: 1;
  background-color: #f5f5f5;
  padding: 1rem;
  margin: 10px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Container>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <ContentContainer>
          <main>{children}</main>
        </ContentContainer>
      </Container>
    </React.Fragment>
  );
};

export default Layout;
