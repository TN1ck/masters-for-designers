import React from "react";
import styled from "styled-components";
import Container from "./Container";

const FooterContainer = styled.div`
  background: black;
  padding: 10px;
  color: white;
  text-transform: uppercase;
`;

const Footer = class extends React.Component {
  render() {
    return (
      <FooterContainer>
        <Container>
          <i>M</i>aster for <i>D</i>esigners
        </Container>
      </FooterContainer>
    );
  }
};

export default Footer;
