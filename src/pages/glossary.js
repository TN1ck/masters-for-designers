import React from "react";
import styled from "styled-components";
import Container from "../components/Container";
import {Masthead} from "../components/Masthead";
import Layout from "../components/Layout";
import {Headline} from "../components/Headline";
import {SubHeadline} from "../components/SubHeadline";
import {groupBy} from "../utils/groupBy";
import {pairs} from "../utils/pairs";
import Navbar from "../components/Navbar";
import {StaticQuery, graphql} from "gatsby";
import {sortBy} from "../utils/sortBy";
import THEME from "../theme";

const GlossarContainer = styled.main`
  background: ${THEME.colors.blue};
`;

const GroupContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 40px;
`;

const GroupLetter = styled.h2`
  font-size: 40px;
  color: ${THEME.colors.orange};
  border-bottom: 1px solid black;
  margin: 0;
`;

const Group = styled.section`
  padding-top: 20px;
  padding-bottom: 40px;

  letter-spacing: 0.01em;
  line-height: 1.6;

  p {
    padding-top: 20px;
    margin: 0;
  }

  h3 {
    margin: 0;
    padding-top: 40px;
  }
  h4 {
    margin: 0;
    padding-top: 20px;
  }
`;

export class Glossary extends React.Component {
  render() {
    const data = this.props.data;
    const masters = data.masters.edges.map(n => n.node);
    const {items: glossary, title, content} = data.glossary.edges[0].node;
    const groupedByLetter = sortBy(pairs(groupBy(glossary, d => d.title[0])), d => d[0]);
    return (
      <Layout>
        <Navbar background={THEME.colors.blue} masterCount={masters.length} />
        <GlossarContainer>
          <Masthead background={THEME.colors.blue}>
            <Container>
              <Headline>{title}</Headline>
              <SubHeadline>{content}</SubHeadline>
            </Container>
          </Masthead>
          <Container>
            {groupedByLetter.map(([letter, list], i) => {
              const noBorderTop = i <= 1;
              return (
                <div>
                  <GroupLetter>{letter}</GroupLetter>
                  <GroupContainer>
                    {list.map((d, i) => {
                      return (
                        <Group key={i} noBorderTop>
                          <h3>{d.title}</h3>
                          <p>{d.content}</p>
                          {d.sections &&
                            d.sections.map(({subtitle, content}, j) => (
                              <React.Fragment key={j}>
                                <h4>{subtitle}</h4>
                                <p>{content}</p>
                              </React.Fragment>
                            ))}
                        </Group>
                      );
                    })}
                  </GroupContainer>
                </div>
              );
            })}
          </Container>
        </GlossarContainer>
      </Layout>
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query GlossaryQuery {
        masters: allMastersJson {
          ...Masters
        }
        glossary: allGlossaryJson {
          edges {
            node {
              title
              content
              items {
                title
                content
                sections {
                  subtitle
                  content
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Glossary data={data} />}
  />
);
