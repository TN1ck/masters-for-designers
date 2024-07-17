import React from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import {Link} from "gatsby";
import Container from "../../components/Container";
import {Masthead} from "../../components/Masthead";
import {Headline} from "../../components/Headline";
import {SubHeadline} from "../../components/SubHeadline";
import Navbar from "../../components/Navbar";
import {Row, ColumnHalf, ColumnFull, Container as InformationPageContainer} from "../../components/InformationPage";
import {InstagramLink, FacebookLink} from "../../components/Social";
import THEME from "../../theme";
import TextContainer from "../../components/TextContainer";

const SocialIcons = styled.div`
  display: flex;
  padding-top: 5px;
`;

const About = ({data}) => {
  return (
    <Layout background={THEME.colors.orange}>
      <Navbar showBorder />
      <Masthead>
        <Container>
          <Headline>{"About"}</Headline>
          <TextContainer>
            <SubHeadline>
              Masters for Designers hat sich zum Ziel gesetzt die Diversität des Masterangebots sichtbar zu machen und
              allen interessierten Designer:innen die Möglichkeit zu geben den individuell passenden Studiengang zu finden.
              <br />
              Alle Studiengänge sind daher übersichtlich sortiert nach formalen und inhaltlichen Eigenschaften: von
              Standort und Internationalität bis hin zur disziplinärer Zusammensetzung der Studierenden.
              <br />
              Das <Link to="/glossary">Glossar</Link> hilft zudem die verschiedenen Merkmale der Studiengänge besser
              verstehen zu können.
              <br />
              <br />
              Es warten über 150 Studiengänge darauf entdeckt zu werden - also schau dich um und{" "}
              <Link to="/">finde den Master</Link>, der am besten zu dir passt.
            </SubHeadline>
          </TextContainer>
        </Container>
      </Masthead>
      <InformationPageContainer>
        <Container>
          <TextContainer>
            <Row>
              <ColumnHalf>
                <h3>
                  <i>M</i>ASTERS FOR <i>D</i>ESIGNERS
                </h3>
                <p>
                  Ein Projekt von <a href="http://www.stephaniebrenner.com">Stephanie Brenner</a>
                </p>
                <p>
                  Programmierung
                  <br />
                  <a href="https://tn1ck.com">Tom Nick</a>
                </p>
              </ColumnHalf>
              <ColumnHalf>
                <h3>Kontakt</h3>
                <p>Du möchtest uns Feedback geben, hast eine Frage oder Anregungen?</p>
                <p>
                  Schreib uns eine Email - wir freuen uns von dir zu hören.
                  <br />
                  <a href="mailto:hello@mastersfordesigners.com">hello@mastersfordesigners.com</a>
                </p>
              </ColumnHalf>
              <ColumnHalf>
                <h3>Partner</h3>
                <p>
                  Ein besonderes Dankeschön geht an <a href="http://www.ortype.is">ortype</a>, deren großartige Schrift
                  L10 wir verwenden dürfen.
                </p>
              </ColumnHalf>
              <ColumnHalf>
                <h3>News</h3>
                <p>Aktuelle Informationen findest du hier.</p>
                <div style={{marginLeft: -5}}>
                  <SocialIcons>
                    <InstagramLink />
                    <FacebookLink />
                  </SocialIcons>
                </div>
              </ColumnHalf>
            </Row>
            <br />
            <br />
            <Row>
              <ColumnFull>
                <h3>Recherche und Aktualität</h3>
                <p>
                  Alle Informationen zu den einzelnen Masterstudiengängen sind mit bestem Wissen und Gewissen
                  recherchiert und basieren auf der Analyse der Prüfungs- und Studienordnungen sowie der
                  Selbstdarstellung der Studiengänge auf der jeweiligen Hochschulseite. (Stand Januar 2024)
                </p>
              </ColumnFull>
            </Row>
          </TextContainer>
        </Container>
      </InformationPageContainer>
    </Layout>
  );
};

export default About;
