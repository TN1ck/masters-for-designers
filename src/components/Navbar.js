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
`;

const NavbarInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;

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
        <Container>
          <NavbarInnerContainer>
            <NavbarInformation>
              <NavbarLink to="/">{`Studiengänge ${masterCount} / Hochschulen ${universityCount}`}</NavbarLink>
            </NavbarInformation>
            <NavbarLinks>
              <NavbarLink to="/about">About</NavbarLink>
              <NavbarLink to="/glossary">Glossar</NavbarLink>
              <NavbarLink style={{paddingRight: 0}} to="/notes">
                Merkliste
              </NavbarLink>
            </NavbarLinks>
          </NavbarInnerContainer>
        </Container>
      </NavbarContainer>
    );
  }
};

export default Navbar;
