import React from "react";
import Layout from "../../components/Layout";
import Navbar from "./Navbar";
import Container from "../../components/Container";
import {StaticQuery} from "gatsby";
import Master from "./Master";
import {graphql} from "gatsby";
import {Masthead} from "./Masthead";
import {Headline} from "./Headline";
import {SubHeadline} from "./SubHeadline";

export const mastersQuery = graphql`
  fragment Masters on MastersJsonConnection {
    edges {
      node {
        name
        university
        department
        otherUniversity
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
`;

export const universityQuery = graphql`
  fragment Universities on SchoolsJsonConnection {
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
`;

export const enhanceUniversities = (universities, masters) => {
  const universityMap = {};
  for (const university of universities) {
    university.masters = [];
    universityMap[university.name] = university;
  }

  for (const master of masters) {
    const university = universityMap[master.university];
    university.masters.push(master);
  }
  return universityMap;
};

class Masters extends React.Component {
  render() {
    const masters = this.props.data.masters.edges.map(n => n.node);
    const universities = this.props.data.universities.edges.map(n => n.node);
    const universityMap = enhanceUniversities(universities, masters);

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
          const university = universityMap[master.university];
          return (
            <Container key={i}>
              <Master master={master} university={university} />
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
          ...Masters
        }
        universities: allSchoolsJson {
          ...Universities
        }
      }
    `}
    render={data => <Masters data={data} />}
  />
);
