import React from "react";
import styled from "styled-components";
import {Link} from "gatsby";

const NavbarContainer = styled.nav`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const NavbarInformation = styled.div`
  display: flex;
`;

const NavbarLink = styled(Link)`
  padding-right: 10px;
  color: black;
`;

const NavbarLinks = styled.div``;

const Navbar = class extends React.Component {
  render() {
    return (
      <NavbarContainer role="navigation" aria-label="main-navigation">
        <NavbarInformation>
          <NavbarLink to="/masters">{`Studiengänge 000`}</NavbarLink>
          <NavbarLink to="/universities">{`Hochschulen 000`}</NavbarLink>
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
