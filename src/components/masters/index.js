import React from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import Navbar from "./Navbar";
import Container from "../../components/Container";
import {StaticQuery, graphql} from "gatsby";
import Master from "./Master";

const Masthead = styled.header`
  background-color: rgb(255, 105, 58);
  padding-bottom: 20px;
`;

const Headline = styled.h1`
  font-size: 54px;
  color: black;
  padding-top: 20px;
  padding-bottom: 0;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 3.2px;
`;

const SubHeadline = styled.h3`
  font-size: 24px;
  color: black;
  font-weight: 300;
  line-height: 1.5;
`;

class Masters extends React.Component {
  render() {
    const masters = this.props.data.masters.edges.map(n => n.node);
    const universities = this.props.data.universities.edges.map(n => n.node);
    console.log(masters, universities);
    return (
      <Layout>
        <Masthead>
          <Container>
            <Navbar universityCount={universities.length} masterCount={masters.length} />
            <Headline>
              <i>M</i>
              {"asters for"}
              <br />
              <i>D</i>esigners
            </Headline>
            <SubHeadline>
              {
                "MD bietet einen Überblick über alle für Designer zugänglichen Masterstudiengänge an staatlichen Hochschulen in Deutschland."
              }
            </SubHeadline>
          </Container>
        </Masthead>
        {masters.map((master, i) => {
          return (
            <Container key={i}>
              <Master master={master} />
            </Container>
          );
        })}
      </Layout>
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query MastersQuery {
        masters: allMastersJson {
          edges {
            node {
              name
              university
              applicationDeadlines {
                date
                international
                type
              }
              internationality {
                semesterAbroad
                doubleDegree
                mainLanguages
              }
              timeAndMoney {
                costs
                semester
                allowedForms
              }
              direction {
                degree
                masterType
                direction
              }
              topicAndFocus {
                topicFocus
                functionalComposition
                allowedDisciplines
              }
              metadata {
                website
                facebook
                instagram
                twitter
              }
            }
          }
        }
        universities: allSchoolsJson {
          edges {
            node {
              id
              name
              city
              address
              type
              longitude
              latitude
            }
          }
        }
      }
    `}
    render={data => <Masters data={data} />}
  />
);
