import React from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import {StaticQuery, graphql, Link} from "gatsby";
import Container from "../../components/Container";
import {Masthead} from "../../components/Masthead";
import {Headline} from "../../components/Headline";
import {SubHeadline} from "../../components/SubHeadline";
import Navbar from "../../components/Navbar";
import {Row, ColumnHalf, ColumnFull, Container as InformationPageContainer} from "../../components/InformationPage";
import {InstagramLink, FacebookLink} from "../../components/Social";

const SocialIcons = styled.div`
  display: flex;
`;

const About = ({data}) => {
  const masters = data.masters.edges.map(n => n.node);
  return (
    <Layout>
      <Navbar masterCount={masters.length} />
      <Masthead>
        <Container>
          <Headline>{"About"}</Headline>
          <SubHeadline>
            Masters for Designers (MD) ist die erste Plattform, die alle für Designer zugänglichen Masterstudiengänge
            auflistet und kuratiert.
            <br />
            <br />
            MD hat es sich zum Ziel gesetzt jedem interessierten Designer die Möglichkeit zu geben, den individuell
            passenden Studiengang zu finden. Übersichtlich und intuitiv sortiert nach inhaltlichen und formalen
            Eigenschaften, von Standort über inhaltlicher Fokus bis hin zu Internationalität. Es warten über 140
            Studiengänge auf dich – also schau dich um und <Link to="/">finde den Master</Link>, der am besten zu dir
            passt. Um die verschiedenen Merkmale der Studiengänge noch besser verstehen zu können, hilft dir auch ein
            Blick ins <Link to="/glossary">Glossar</Link>.
          </SubHeadline>
        </Container>
      </Masthead>
      <InformationPageContainer>
        <Container>
          <Row>
            <ColumnHalf>
              <h3>Schreib uns</h3>
              <p>
                Du möchtest uns Feedback geben, hast eine Frage oder Anregungen, um das Produkt weiter zu entwickeln?
                <br />
                Dann schreibe uns eine Email – wir freuen uns von dir zu hören!
                <br />
                <a href="mailto:hello@mastersfordesigners.com">hello@mastersfordesigners.com</a>
              </p>
            </ColumnHalf>
            <ColumnHalf>
              <h3>Partner</h3>
              <p>
                Thanks ortype for sponsoring L10.
                <br />
                For more amazing fonts have a look at <a href="http://www.ortype.is">ortype.is</a>
              </p>
            </ColumnHalf>
            <ColumnHalf>
              <h3>News</h3>
              <p>
                Eindrücke aus dem Studienalltag der Masterstudierenden, aktuelle Informationen und Updates zu neuen
                Features findest du hier:
              </p>
              <SocialIcons>
                <InstagramLink />
                <FacebookLink />
              </SocialIcons>
            </ColumnHalf>
          </Row>
          <Row>
            <ColumnFull>
              <h5>Quellen</h5>
              <p>
                Alle Informationen zu den einzelnen Masterstudiengängen sind mit bestem Wissen und Gewissen recherchiert
                und basieren auf der Analyse der Prüfungs-und Studienordnungen sowie der Selbstdarstellung der
                Studiengänge auf der jeweiligen Hochschulseite (Stand Mai 2017).
              </p>
            </ColumnFull>
          </Row>
        </Container>
      </InformationPageContainer>
    </Layout>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query AboutQuery {
        masters: allMastersJson {
          ...Masters
        }
      }
    `}
    render={data => <About data={data} />}
  />
);
