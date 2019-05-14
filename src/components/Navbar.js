import React from "react";
import styled from "styled-components";
import {Link} from "gatsby";
import THEME from "../theme";
import Container from "./Container";

const NavbarInformation = styled.div`
  display: flex;
`;

const NavbarContainer = styled.nav`
  z-index: 100;
  background: ${p => p.background || THEME.colors.orange};
  top: 0;
  position: sticky;
`;

const Circle = styled.span`
  display: inline-flex;
  margin-left: 7px;
  justify-content: center;
  align-items: center;
  text-transform: lowercase;
  color: white;
  width: 26px;
  height: 26px;
  background: black;
  border-radius: 50%;
`;

const NavbarLink = styled(Link)`
  margin-right: 10px;
  color: black;
  text-decoration: none;
  border: none;

  &.active {
    ${Circle} {
      background: white;
      color: black;
    }
  }

  &:hover,
  &:focus {
    // color: #333333;
    border: none;

    ${Circle} {
      background: white;
      color: black;
    }
  }
  text-transform: uppercase;
`;

const MainNavbarLink = styled(NavbarLink)`
  font-size: 18px;
  font-weight: 500;
`;

const NavbarLinks = styled.div`
  margin-right: -10px;
`;

const NavbarInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const HideMobile = styled.div`
  display: none;
  @media (min-width: 641px) {
    display: block;
  }
`;

const ShowMobile = styled.div`
  display: none;
  @media (max-width: 640px) {
    display: block;
  }
`;

const Navbar = class extends React.Component {
  render() {
    const {universityCount, masterCount, background} = this.props;
    return (
      <NavbarContainer background={background} role="navigation" aria-label="main-navigation">
        <Container>
          <HideMobile>
            <NavbarInnerContainer>
              <NavbarInformation>
                <MainNavbarLink to="/">
                  {`${masterCount} `}
                  <i>M</i>asters for <i>D</i>esigners
                </MainNavbarLink>
              </NavbarInformation>
              <NavbarLinks>
                <NavbarLink to="/about" activeClassName="active">
                  About<Circle>{"i"}</Circle>
                </NavbarLink>
                <NavbarLink to="/glossary" activeClassName="active">
                  Glossar<Circle>{"?"}</Circle>
                </NavbarLink>
                {/* <NavbarLink style={{paddingRight: 0}} to="/notes" activeClassName="active">
                  Merkliste
                  <Circle>{"0"}</Circle>
                </NavbarLink> */}
              </NavbarLinks>
            </NavbarInnerContainer>
          </HideMobile>
          <ShowMobile>
            <NavbarInnerContainer>
              <NavbarInformation>
                <MainNavbarLink to="/">
                  {`${masterCount} `}
                  <i>MD</i>
                </MainNavbarLink>
              </NavbarInformation>
              <NavbarLinks>
                <NavbarLink to="/about" activeClassName="active">
                  <Circle>{"i"}</Circle>
                </NavbarLink>
                <NavbarLink to="/glossary" activeClassName="active">
                  <Circle>{"?"}</Circle>
                </NavbarLink>
                <NavbarLink style={{paddingRight: 0}} to="/notes" activeClassName="active">
                  <Circle>{"0"}</Circle>
                </NavbarLink>
              </NavbarLinks>
            </NavbarInnerContainer>
          </ShowMobile>
        </Container>
      </NavbarContainer>
    );
  }
};

export default Navbar;
