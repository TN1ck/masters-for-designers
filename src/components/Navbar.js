import React from "react";
import styled from "styled-components";
import {Link, StaticQuery, graphql} from "gatsby";
import THEME from "../theme";
import Container from "./Container";
import {getSavedMasters} from "../storage";

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
  margin-right: 24px;
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

  @media (max-width: 700px) {
    margin-right: 10px;
  }
`;

const MainNavbarLink = styled(NavbarLink)`
  font-size: 18px;
  font-weight: bold;
  @media (max-width: 700px) {
    font-weight: 400;
  }
`;

const NavbarLinks = styled.div`
  margin-right: -24px;

  @media (max-width: 700px) {
    margin-right: -10px;
  }
`;

const NavbarInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
`;

const HideMobile = styled.div`
  display: none;
  @media (min-width: 701px) {
    display: block;
  }
`;

const ShowMobile = styled.div`
  display: none;
  @media (max-width: 700px) {
    display: block;
  }
`;

const Navbar = class extends React.Component {
  render() {
    const {masterCount, background} = this.props;
    const savedMastersCount = this.props.savedMastersCount || getSavedMasters().length;
    return (
      <NavbarContainer background={background} role="navigation" aria-label="main-navigation">
        <Container>
          <HideMobile>
            <NavbarInnerContainer>
              <NavbarInformation>
                <MainNavbarLink to="/">
                  <i>M</i>asters for <i>D</i>esigners
                  {` (${masterCount})`}
                </MainNavbarLink>
              </NavbarInformation>
              <NavbarLinks>
                <NavbarLink to="/about" activeClassName="active">
                  About<Circle>{"i"}</Circle>
                </NavbarLink>
                <NavbarLink to="/glossary" activeClassName="active">
                  Glossar<Circle>{"?"}</Circle>
                </NavbarLink>
                <NavbarLink style={{paddingRight: 0}} to="/saved-masters" activeClassName="active">
                  Merkliste
                  <Circle>{savedMastersCount}</Circle>
                </NavbarLink>
              </NavbarLinks>
            </NavbarInnerContainer>
          </HideMobile>
          <ShowMobile>
            <NavbarInnerContainer>
              <NavbarInformation>
                <MainNavbarLink to="/">
                  <i>M</i>asters
                  {` (${masterCount})`}
                </MainNavbarLink>
              </NavbarInformation>
              <NavbarLinks>
                <NavbarLink to="/about" activeClassName="active">
                  <Circle>{"i"}</Circle>
                </NavbarLink>
                <NavbarLink to="/glossary" activeClassName="active">
                  <Circle>{"?"}</Circle>
                </NavbarLink>
                <NavbarLink style={{paddingRight: 0}} to="/saved-masters" activeClassName="active">
                  <Circle>{savedMastersCount}</Circle>
                </NavbarLink>
              </NavbarLinks>
            </NavbarInnerContainer>
          </ShowMobile>
        </Container>
      </NavbarContainer>
    );
  }
};

export default ({masterCount, background}) => (
  <StaticQuery
    query={graphql`
      query NavbarQuery {
        masters: allMastersJson {
          totalCount
        }
      }
    `}
    render={data => {
      return <Navbar masterCount={masterCount || data.masters.totalCount} background={background} />;
    }}
  />
);
