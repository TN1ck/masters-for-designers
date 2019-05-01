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

const GLOSSARY = [
  {
    title: "Ausrichtung",
    content: `Die angebotenen Masterstudiengänge umfassen grundsätzlich sowohl wissenschaftliche,
    forschungsorientierte als auch entwurfspraktische, praxisorientierte Anteile. Je nach Konzept der
    Studiengänge wird die Ausrichtung jedoch verstärkt auf einen der beiden Bereiche gelegt.`,
    sections: [
      {
        subtitle: "praktisch",
        content: `Die meisten Masterstudiengänge für Designer zeichnen sich durch ein entwurfspraktisches Studium aus,
    welches auch mit einer solchen Masterarbeit abschließt. An diese gliedert sich meist zusätzlich eine
    theoretische Reflexion.`,
      },

      {
        subtitle: "theoretisch",
        content: `Das theoretische Masterstudium unterscheidet sich in zwei Aspekten. So kennzeichnen sich einzelne
    Studiengänge durch eine praxisnahe Ausbildung in Form eines projektorientierten Studiums,
    Kooperationen mit Unternehmen oder ein fest im Studium verankerten Praxissemester. Andererseits bietet
    das Masterstudium auch die Möglichkeit einer rein wissenschaftlichen Auseinandersetzung mit der
    Disziplin des Design.`,
      },
    ],
  },

  {
    title: "Doppelabschluss",
    content: `Im Rahmen von Double-Degree-Programmen absolvieren Studierende in der Regel die Hälfte ihrer
    Studienzeit im Ausland. Sie erwerben dadurch sowohl einen Abschluss an einer deutschen Hochschule als
    auch an der ausländischen Partnerhochschule.`,
  },

  {
    title: "Fachliche Zusammensetzung",
    content: `
    Die Zusammensetzung gibt Auskunft über die fachliche Herkunft der Studierenden innerhalb eines
    Studiengangs.`,
    sections: [
      {subtitle: "disziplinär", content: `Alle Studierenden kommen aus derselben Fachrichtung.`},
      {
        subtitle: "interdisziplinär gestalterisch",
        content: `Studierende verschiedener gestalterischer Fachrichtungen studieren zusammen.`,
      },
      {
        subtitle: "interdisziplinär gestalterisch/nicht-gestalterisch",
        content: `Designer studieren gemeinsam mit Studierenden aus nicht-gestalterischen Fachrichtungen.`,
      },
    ],
  },

  {
    title: "Forschungsvorhaben",
    content: `Bei einer Vielzahl von Masterstudiengängen wird ein Forschungsvorhaben oder auch ein Proposal, ein
    Vorschlag für ein Masterprojekt, in der ein oder anderen Form bereits bei der Bewerbung eingefordert.
    Die Ausgestaltung variiert dabei jedoch von Hochschule zu Hochschule. Zum einen kann das
    Forschungsvorhaben als Grundlage des Studiums verstanden werden, zum anderen als Projekt, welches
    während des Studiums oder in einem bestimmten Semester bearbeitet wird, jedoch nicht zwangsläufig in
    der Masterthesis enden muss. Allen Ansätzen gemein ist jedoch die intensive Auseinandersetzung mit
    einem Thema und den eigenen Interessen in Bezug auf eine fachliche Disziplin.`,
  },

  {
    title: "Inhaltlicher Fokus",
    content: `Basierend auf der Tatsache, dass im Masterstudium Studierende aus verschiedenen Fachrichtungen
    zusammen treffen können, ergeben sich auch auf inhaltlicher Ebene neue Möglichkeiten das Studium zu
    konzipieren. Die gelisteten Studiengänge lassen sich diesbezüglich in drei verschiedene Bereiche
    unterteilen:`,
    sections: [
      {subtitle: "fachspezifisch", content: `Der inhaltliche Fokus liegt auf einer bestimmten Fachrichtung.`},
      {
        subtitle: "fächerübergreifend",
        content: `Interdisziplinarität bezieht sich hier nicht nur auf die fachliche Herkunft der Studierenden, vielmehr
    liegt der inhaltliche Fokus auf der Zusammenarbeit der verschiedenen Fachrichtungen. Durch ein
    speziell entwickeltes Modell fördern manche Studiengänge dabei sogar gezielt das Verständnis für die
    jeweils andere Disziplin zu Beginn des Studiums, indem sie die Basics der anderen Disziplin in extra
    dafür vorgesehenen Modulen lehren.`,
      },
      {
        subtitle: "thematisch",
        content: `Einige Masterstudiengänge konzentrieren sich ausschließlich auf eine bestimmte Thematik. Diese kann
    teilweise von Masterjahrgang zu Masterjahrgang wechseln.`,
      },
    ],
  },
  {
    title: "Integriertes Auslandssemester",
    content: `Bestimmte Studiengänge beinhalten ein integriertes Auslandssemester. Dabei ist fester Bestandteil des
    Studiums, ein Semester an einer ausländischen Hochschule zu absolvieren. Verstärkt international
    ausgerichtete Master lassen sich daran erkennen.`,
  },

  {
    title: "Internationalität",
    content: `Ein international ausgerichtetes Studium lässt sich auf drei verschiedenen Ebenen erkennen:
    sprachlich, räumlich und inhaltlich. Als ganzheitlich international wird demnach ein Studium
    verstanden, welches neben der englischen Hauptunterrichtssprache und einem integrierten
    Auslandssemester auch Kompetenzen vermittelt, die für eine Tätigkeit in einem internationalen Umfeld
    relevant sind.`,
  },

  {
    title: "Mastertyp",
    content: `Das Masterstudium wird in verschiedenen Studienstrukturen angeboten: Es gibt konsekutive,
    nicht-konsekutive und weiterbildende Masterstudiengänge.`,
    sections: [
      {
        subtitle: "konsekutiv",
        content: `Konsekutive Masterprogramme folgen inhaltlich den erworbenen Kenntnissen und Fähigkeiten des
    Erststudiums, wie zum Beispiel dem Bachelor. Diese Programme können vertiefen oder – soweit der
    fachliche Zusammenhang gewahrt bleibt – fächerübergreifend erweitern.`,
      },

      {
        subtitle: "nicht-konsekutiv",
        content: `In nicht-konsekutiven Masterprogrammen wird das Gelernte fächerübergreifend erweitert.`,
      },

      {
        subtitle: "weiterbildend",
        content: `Als weiterbildende Masterstudiengänge werden Studiengänge bezeichnet, die eine Phase der Berufspraxis
    voraussetzen, welche im Lehrangebot berücksichtigt wird.`,
      },
    ],
  },

  {
    title: "Regelstudienzeit",
    content: `Die Dauer eines Bachelorstudiums variiert zwischen sechs, sieben oder acht Semestern für ein
    Vollzeitstudium. Bei konsekutiven Studiengängen richtet sich die Regelstudienzeit des Masterstudiums
    an der des Bachelorstudiums aus und beträgt zwei, drei oder vier Semester. Insgesamt soll die
    Regelstudienzeit von Bachelor- und Masterstudium zehn Semester (300 Credits) ergeben.`,
    sections: [
      {
        subtitle: "Anpassungssemester",
        content: `Summieren sich das abgeschlossene Bachelorstudium und das geplante Masterstudium zusammen nicht zu
    mindestens zehn Semestern Studienzeit, besteht die Möglichkeit je nach Regelung der jeweiligen
    Hochschule ein Anpassungssemester zu absolvieren oder eine berufspraktische Tätigkeit angerechnet zu
    bekommen. Somit können fehlende Credits nachgeholt werden. Dies kann zum Beispiel im Fall eines
    Hochschulwechsels nach Bachelorabschluss zutreffen.`,
      },
      {
        subtitle: "Sonderregelung",
        content: `Kunsthochschulen bleibt es vorbehalten, Masterstudiengänge in künstlerischen Kernfächern unabhängig
    von der Bachelorstudienzeit auf vier Semester anzulegen. Die Studienzeit von Bachelor- und
    Masterstudium kann somit bis zu zwölf Semester (360 Credits) ergeben. Welche Fächer zu den
    künstlerischen Kernfächern zählen, beschließt die jeweilige Hochschule in Zusammenarbeit mit dem
    Wissenschaftsressort. Diese Studiengänge werden dann in einem Master of Fine Arts absolviert. Die
    Abschlussbezeichnung wird der Fächergruppe der Freien Kunst zugeschrieben.`,
      },
    ],
  },
  {
    title: "Studiengebühren",
    content: `Studiengebühren werden in Deutschland nur für weiterbildende Masterstudiengänge erhoben. Konsekutive
    Studiengänge sind dagegen gebührenfrei.`,
  },

  {
    title: "Studienrichtung",
    content: `An manchen Hochschulen erfolgt die Bewerbung direkt für eine Studienrichtung innerhalb eines
    Studienganges. Um die Suche zu vereinfachen und dies deutlich zu machen, nennt MD die Studienrichtung
    und verweist in Klammern auf den Studiengang wie er auf Seiten der Hochschule zu finden ist. Zum
    Beispiel: Illustration (Visuelle Kommunikation)`,
  },
];

const GlossarContainer = styled.main`
  background: ${THEME.colors.blue};
`;

const GroupedByLetter = sortBy(pairs(groupBy(GLOSSARY, d => d.title[0])), d => d[0]);

const GroupContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 40px;
`;

const GroupLetter = styled.h2`
  font-size: 60px;
  color: ${THEME.colors.orange};
  margin: 0;
`;

const Group = styled.section`
  padding-top: 20px;
  padding-bottom: 40px;
  border-top: 1px solid black;

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

class Glossar extends React.Component {
  render() {
    const data = this.props.data;
    const masters = data.masters.edges.map(n => n.node);
    const universities = data.universities.edges.map(n => n.node);
    return (
      <Layout>
        <Navbar universityCount={universities.length} masterCount={masters.length} />
        <GlossarContainer>
          <Masthead>
            <Container>
              <Headline>GLOSSAR</Headline>
              <SubHeadline>
                Hier werden themenspezifische Fachbegriffe, im Kontext ihrer Verwendung auf dieser Website erklärt, um
                so ein besseres Verständnis der unterschiedlichen Eigenschaften der Masterstudiengänge zu ermöglichen.{" "}
              </SubHeadline>
            </Container>
          </Masthead>
          <Container>
            <GroupContainer>
              {GroupedByLetter.map(([letter, list]) => {
                return (
                  <Group key={letter}>
                    <GroupLetter>{letter}</GroupLetter>
                    {list.map((d, i) => {
                      return (
                        <React.Fragment key={i}>
                          <h3>{d.title}</h3>
                          <p>{d.content}</p>
                          {d.sections &&
                            d.sections.map(({subtitle, content}) => (
                              <>
                                <h4>{subtitle}</h4>
                                <p>{content}</p>
                              </>
                            ))}
                        </React.Fragment>
                      );
                    })}
                  </Group>
                );
              })}
            </GroupContainer>
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
        universities: allSchoolsJson {
          ...Universities
        }
      }
    `}
    render={data => <Glossar data={data} />}
  />
);
