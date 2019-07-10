import React from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import {Masthead} from "../components/Masthead";
import {Headline} from "../components/Headline";
import Navbar from "../components/Navbar";
import {Row, ColumnHalf, Container as InformationPageContainer} from "../components/InformationPage";

const Imprint = ({data}) => {
  return (
    <Layout background={"white"}>
      <Navbar showBorder background="white" />
      <Masthead background="white">
        <Container>
          <Headline>{"Impressum"}</Headline>
          <small>Angaben gemäß § 5 TMG</small>
        </Container>
      </Masthead>
      <InformationPageContainer>
        <Container>
          {/* <h5 style={{padding: 0, marginTop: 0, marginBottom: 20}}>Angaben gemäß §5 TMG:</h5> */}
          <Row>
            <ColumnHalf>
              Stephanie Brenner
              <br />
              Fuldastraße 6
              <br />
              12043 Berlin
              <br />
              <br />
              <a href="tel:+4917666893941">+49 176 66 893 941</a>
              <br />
              <a href="mailto:hello@mastersfordesigners.com">hello@mastersfordesigners.com</a>
            </ColumnHalf>
            <ColumnHalf>
              MASTERS FOR DESIGNERS ist ein Projekt
              <br />
              von <a href="http://www.stephaniebrenner.com">Stephanie Brenner</a>
              <br />
              <p>
                Programmierung
                <br />
                <a href="https://tomnick.org">Tom Nick</a>
              </p>
            </ColumnHalf>
          </Row>
          <h3>Haftungshinweise</h3>
          <Row>
            <ColumnHalf>
              <h5>Haftung für Inhalte</h5>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
                forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
                bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis
                einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden
                wir diese Inhalte umgehend entfernen.
              </p>
            </ColumnHalf>
            <ColumnHalf>
              <h5>Haftung für Links</h5>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
                verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <p>
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
                Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links
                umgehend entfernen.
              </p>
            </ColumnHalf>
            <ColumnHalf>
              <h5>Urheberrecht</h5>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
              <p>
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
                Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem
                auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
                Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
              <p>
                Quelle: <a href="https://www.erecht24.%20de">https://www.e-recht24.de</a>
              </p>
            </ColumnHalf>
          </Row>
        </Container>
      </InformationPageContainer>
    </Layout>
  );
};

export default Imprint;
