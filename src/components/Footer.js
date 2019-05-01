import React from "react";
import styled from "styled-components";
import {Link} from "gatsby";

import logo from "../img/logo.svg";
import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";
import twitter from "../img/social/twitter.svg";
import vimeo from "../img/social/vimeo.svg";
import Container from "./Container";

const FooterContainer = styled.div`
  background: black;
  padding: 10px;
  color: white;
`;

const Footer = class extends React.Component {
  render() {
    return (
      <FooterContainer>
        <Container>{"Master for Designers"}</Container>
      </FooterContainer>
    );
  }
};

export default Footer;
