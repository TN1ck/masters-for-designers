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
import TextContainer from "../TextContainer";
import {Row, ColumnHalf, Container as InformationPageContainer} from "../InformationPage";

const StyledInformationContainer = styled(InformationPageContainer)`
  h3 {
    margin-top: 42px;
  }

  h4 {
    margin-top: 28px;
    margin-bottom: -5px;
  }

  p {
    line-height: 1.6;
  }
`;

const GlossarContainer = styled.main`
  background: ${THEME.colors.blue};

  ${ColumnHalf} {
    @media (max-width: 800px) {
      width: 100%;
    }
  }
`;

const GroupLetter = styled.h2`
  font-size: 40px;
  color: ${THEME.colors.orange};
  border-bottom: 1px solid black;
  margin: 0;
  margin-top: 60px;
`;

const Group = styled.div`
  // ${Row} {
  //   margin-top: -30px;
  // }
`;

export const GlossaryInner = ({glossary, title, content}) => {
  const groupedByLetter = sortBy(pairs(groupBy(glossary, d => d.title[0])), d => d[0]);
  return (
    <GlossarContainer>
      <Masthead background={THEME.colors.blue}>
        <Container>
          <Headline>{title}</Headline>
          <TextContainer>
            <SubHeadline>{content}</SubHeadline>
          </TextContainer>
        </Container>
      </Masthead>
      <Container>
        <StyledInformationContainer>
          {groupedByLetter.map(([letter, list], i) => {
            return (
              <React.Fragment key={i}>
                <GroupLetter>{letter}</GroupLetter>
                <Group>
                  <Row>
                    {list.map((d, i) => {
                      return (
                        <ColumnHalf key={i}>
                          <h3>{d.title}</h3>
                          <p>{d.content}</p>
                          {d.sections &&
                            d.sections.map(({subtitle, content}, j) => (
                              <React.Fragment key={j}>
                                <h4>{subtitle}</h4>
                                <p>{content}</p>
                              </React.Fragment>
                            ))}
                        </ColumnHalf>
                      );
                    })}
                  </Row>
                </Group>
              </React.Fragment>
            );
          })}
        </StyledInformationContainer>
      </Container>
    </GlossarContainer>
  );
};

export default class Glossary extends React.Component {
  render() {
    const data = this.props.data;
    const {items: glossary, title, content} = data.glossary.edges[0].node;
    return (
      <Layout background={THEME.colors.blue}>
        <Navbar showBorder background={THEME.colors.blue} />
        <GlossaryInner glossary={glossary} title={title} content={content} />
      </Layout>
    );
  }
}
