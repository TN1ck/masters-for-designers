import React from "react";
import Layout from "../../components/Layout";
import {StaticQuery, graphql} from "gatsby";
import {enhanceUniversities} from "../../components/masters";
import Container from "../../components/Container";
import {Masthead} from "../../components/Masthead";
import {Headline} from "../../components/Headline";
import {SubHeadline} from "../../components/SubHeadline";
import Navbar from "../../components/masters/Navbar";

const Universities = ({data}) => {
  const masters = data.masters.edges.map(n => n.node);
  const universities = data.universities.edges.map(n => n.node);
  const universityMap = enhanceUniversities(universities, masters);
  return (
    <Layout>
      <Masthead>
        <Container>
          <Navbar universityCount={universities.length} masterCount={masters.length} />
          <Headline>{"Universities"}</Headline>
          <SubHeadline>{"Hier kannst du alle Universitäten sehen."}</SubHeadline>
        </Container>
      </Masthead>
      <Container>
        <ul>
          {universities.map(u => {
            return (
              <li>
                <h3>{u.name}</h3>
                <ul>
                  u
                  {u.masters.map(m => {
                    return (
                      <li>
                        <a href={`/#${m.name}`}>{m.name}</a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </Container>
    </Layout>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query UniversityQuery {
        masters: allMastersJson {
          ...Masters
        }
        universities: allSchoolsJson {
          ...Universities
        }
      }
    `}
    render={data => <Universities data={data} />}
  />
);
