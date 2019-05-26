import React from "react";
import styled from "styled-components";
import Container from "../Container";
import {Masthead} from "../Masthead";
import Layout from "../Layout";
import {Headline} from "../Headline";
import {SubHeadline} from "../SubHeadline";
import {groupBy} from "../../utils/groupBy";
import {pairs} from "../../utils/pairs";
import Navbar from "../Navbar";
import {sortBy} from "../../utils/sortBy";
import THEME from "../../theme";

const GlossarContainer = styled.main`
  background: ${THEME.colors.blue};
`;

const GroupContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 40px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
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

export const GlossaryInner = ({glossary, title, content}) => {
  const groupedByLetter = sortBy(pairs(groupBy(glossary, d => d.title[0])), d => d[0]);
  return (
    <GlossarContainer>
      <Masthead background={THEME.colors.blue}>
        <Container>
          <Headline>{title}</Headline>
          <SubHeadline>{content}</SubHeadline>
        </Container>
      </Masthead>
      <Container>
        {groupedByLetter.map(([letter, list], i) => {
          return (
            <div key={i}>
              <GroupLetter>{letter}</GroupLetter>
              <GroupContainer>
                {list.map((d, i) => {
                  return (
                    <Group key={i}>
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
  );
};

export default class Glossary extends React.Component {
  render() {
    const data = this.props.data;
    const masters = data.masters.edges.map(n => n.node);
    const {items: glossary, title, content} = data.glossary.edges[0].node;
    return (
      <Layout>
        <Navbar background={THEME.colors.blue} masterCount={masters.length} />
        <GlossaryInner glossary={glossary} title={title} content={content} />
      </Layout>
    );
  }
}