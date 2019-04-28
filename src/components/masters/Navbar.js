import React from "react";
import styled from "styled-components";
import {Link} from "gatsby";

const NavbarInformation = styled.div`
  display: flex;
`;

const NavbarLink = styled(Link)`
  padding-right: 10px;
  color: black;
`;

const NavbarLinks = styled.div``;

const NavbarContainer = styled.nav`
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
          <NavbarLink to="/">{`Studiengänge ${masterCount}`}</NavbarLink>
          <NavbarLink to="/universities">{`Hochschulen ${universityCount}`}</NavbarLink>
        </NavbarInformation>
        <NavbarLinks>
          <NavbarLink to="/about">About</NavbarLink>
          <NavbarLink to="/glossar">Glossar</NavbarLink>
          <NavbarLink style={{paddingRight: 0}} to="/notes">
            Merkliste
          </NavbarLink>
        </NavbarLinks>
      </NavbarContainer>
    );
  }
};

export default Navbar;
