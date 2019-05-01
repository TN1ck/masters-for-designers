import React from "react";
import styled from "styled-components";
import {Link} from "gatsby";
import THEME from "../theme";
import Container from "./Container";

const NavbarInformation = styled.div`
  display: flex;
`;

const NavbarLink = styled(Link)`
  margin-right: 10px;
  color: black;
`;

const NavbarLinks = styled.div`
  margin-right: -10px;
`;

const NavbarContainer = styled.nav`
  z-index: 100;
  background: ${THEME.colors.orange};
  top: 0;
  position: sticky;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;

  @media (max-width: 550px) {
    flex-direction: column;

    & ${NavbarLinks} {
      padding-top: 10px;
    }
  }
`;

const Navbar = class extends React.Component {
  render() {
    const {universityCount, masterCount} = this.props;
    return (
      <NavbarContainer role="navigation" aria-label="main-navigation">
        <NavbarInformation>
          <Container>
            <NavbarLink to="/">{`Studiengänge ${masterCount} / Hochschulen ${universityCount}`}</NavbarLink>
          </Container>
        </NavbarInformation>
        <NavbarLinks>
          <Container>
            <NavbarLink to="/about">About</NavbarLink>
            <NavbarLink to="/glossary">Glossar</NavbarLink>
            <NavbarLink style={{paddingRight: 0}} to="/notes">
              Merkliste
            </NavbarLink>
          </Container>
        </NavbarLinks>
      </NavbarContainer>
    );
  }
};

export default Navbar;
