import React from "react";
import styled from "styled-components";
import Container from "./Container";
import {Link} from "gatsby";

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: black;
  padding: 10px;
  color: white;
  text-transform: uppercase;
`;

const FooterLink = styled(Link)`
  margin-right: 10px;
  &,
  &:hover,
  &:visited {
    color: white;
    border: none;
  }
  text-decoration: none;
  text-transform: uppercase;
`;

const Footer = class extends React.Component {
  render() {
    return (
      <FooterContainer>
        <Container>
          <i>M</i>aster for <i>D</i>esigners
        </Container>
        <Container>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/glossar">Glossar</FooterLink>
          <FooterLink to="/about#impressum">Impressum</FooterLink>
          <FooterLink to="/about#privacy">Datenschutz</FooterLink>
        </Container>
      </FooterContainer>
    );
  }
};

export default Footer;
