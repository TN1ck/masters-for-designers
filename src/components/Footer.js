import React from "react";
import styled from "styled-components";
import {Link} from "gatsby";

import logo from "../img/logo.svg";
import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";
import twitter from "../img/social/twitter.svg";
import vimeo from "../img/social/vimeo.svg";

const FooterContainer = styled.div`
  background: black;
  padding: 10px;
  color: white;
`;

const Footer = class extends React.Component {
  render() {
    return <FooterContainer>{"Master for Designers"}</FooterContainer>;
  }
};

export default Footer;
