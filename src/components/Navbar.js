import React from "react";
import styled from "styled-components";
import {Link, StaticQuery, graphql} from "gatsby";
import THEME from "../theme";
import Container from "./Container";
import {getSavedMasters} from "../storage";
import {MAIN_HEADER_HEIGHT} from "./masters/styles";
import donateImage from "../img/donate.svg";

const NavbarInformation = styled.div`
  display: flex;
`;

const NavbarContainer = styled.nav`
  z-index: 100;
  border-bottom: ${p => (p.showBorder ? "1px solid black" : "none")};
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

  @media (max-width: 700px) {
    margin-right: 10px;
  }
`;

const DonateForm = styled.form`
  display: flex;
  justify-content: center;

  button {
    padding-right: 6px;
    background: none;
    border: none;
    margin: none;
    padding: none;
    font-size: 16px;
    font-family: L10,Helvetica Neue,Helvetica,Arial,Sans-Serif;
    font-weight: 400;
    line-height: 1.4;

    &:hover {
      color: white;
      cursor: pointer;
    }
  }

`;

const MainNavbarLink = styled(NavbarLink)`
  letter-spacing: 0.3px;
  font-size: 22px;
  text-transform: uppercase;
  font-weight: 400;
`;

const NavbarLinks = styled.div`
  margin-right: -24px;
  display: flex;

  @media (max-width: 700px) {
    margin-right: -10px;
  }
`;

const NavbarInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${MAIN_HEADER_HEIGHT}px;
  align-items: center;
`;

const HideMobile = styled.div`
  display: none;
  @media (min-width: 801px) {
    display: block;
  }
`;

const ShowMobile = styled.div`
  display: none;
  @media (max-width: 800px) {
    display: block;
  }
`;

const Navbar = class extends React.Component {
  render() {
    const {masterCount, background, showBorder} = this.props;
    const savedMastersCount = this.props.savedMastersCount || getSavedMasters().length;
    return (
      <NavbarContainer showBorder={showBorder} background={background} role="navigation" aria-label="main-navigation">
        <Container>
          <HideMobile>
            <NavbarInnerContainer>
              <NavbarInformation>
                <MainNavbarLink to="/">
                  <i>M</i>asters for <i>D</i>esigners
                  {" ("}
                  <i>{masterCount}</i>
                  {")"}
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
                <DonateForm action="https://www.paypal.com/donate" method="post" target="_top">
                    <button>Support</button>
                    <input type="hidden" name="hosted_button_id" value="AJFZJW5THYG8Q" />
                    <input width="26" height="26" type="image" src={donateImage} border="0" name="submit" title="Donate using PayPal" alt="Donate using PayPal" />
                    <img alt="" border="0" src="https://www.paypal.com/de_DE/i/scr/pixel.gif" width="1" height="1" />
                </DonateForm>
              </NavbarLinks>
            </NavbarInnerContainer>
          </HideMobile>
          <ShowMobile>
            <NavbarInnerContainer>
              <NavbarInformation>
                <MainNavbarLink to="/">
                  <i>M</i>asters
                  {" ("}
                  <i>{masterCount}</i>
                  {")"}
                </MainNavbarLink>
              </NavbarInformation>
              <NavbarLinks>
                <NavbarLink to="/about" activeClassName="active">
                  <Circle>{"i"}</Circle>
                </NavbarLink>
                <NavbarLink to="/glossary" activeClassName="active">
                  <Circle>{"?"}</Circle>
                </NavbarLink>
                <NavbarLink style={{paddingRight: 6}} to="/saved-masters" activeClassName="active">
                  <Circle>{savedMastersCount}</Circle>
                </NavbarLink>
                <DonateForm action="https://www.paypal.com/donate" method="post" target="_top">
                    <input type="hidden" name="hosted_button_id" value="AJFZJW5THYG8Q" />
                    <input width="26" height="26" type="image" src={donateImage} border="0" name="submit" title="Donate using PayPal" alt="Donate using PayPal" />
                    <img alt="" border="0" src="https://www.paypal.com/de_DE/i/scr/pixel.gif" width="1" height="1" />
                </DonateForm>
              </NavbarLinks>
            </NavbarInnerContainer>
          </ShowMobile>
        </Container>
      </NavbarContainer>
    );
  }
};

const NavbarWrapped = ({masterCount, background, showBorder}) => (
  <StaticQuery
    query={graphql`
      query NavbarQuery {
        masters: allMastersJson {
          totalCount
        }
      }
    `}
    render={data => {
      return (
        <Navbar showBorder={showBorder} masterCount={masterCount || data.masters.totalCount} background={background} />
      );
    }}
  />
);

export default NavbarWrapped;
