import React from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import Navbar from "./Navbar";
import Container from "../../components/Container";

const Masthead = styled.header`
  background-color: rgb(255, 105, 58);
  padding-bottom: 20px;
`;

const Headline = styled.h1`
  font-size: 54px;
  color: black;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const SubHeadline = styled.h3`
  font-size: 24px;
  color: black;
`;

class Masters extends React.Component {
  render() {
    return (
      <Layout>
        <Masthead>
          <Container>
            <Navbar />
            <Headline>{"Masters for Designers"}</Headline>
            <SubHeadline>
              {
                "MD bietet einen Überblick über alle für Designer zugänglichen Masterstudiengänge an staatlichen Hochschulen in Deutschland."
              }
            </SubHeadline>
          </Container>
        </Masthead>
      </Layout>
    );
  }
}

export default Masters;
