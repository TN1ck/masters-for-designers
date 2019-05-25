import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import {StaticQuery, graphql, Link} from "gatsby";
import Container from "../components/Container";
import {Masthead} from "../components/Masthead";
import {Headline} from "../components/Headline";
import Navbar from "../components/Navbar";

const AboutContainer = styled.div`
  background: white;
  padding-bottom: 80px;
  word-break: break-word;

  & p {
    padding: 0;
  }

  h3 {
    margin-top: 40px;
    margin-bottom: 0;
    font-size: 30px;
    letter-spacing: 0.02em;
  }

  h5 {
    margin-top: 40px;
    margin-bottom: 0;
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
`;

const ColumnHalf = styled.div`
  width: 50%;
  padding: 0 20px;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const ColumnFull = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const Privacy = ({data}) => {
  const masters = data.masters.edges.map(n => n.node);
  return (
    <Layout>
      <Navbar background="white" masterCount={masters.length} />
      <Masthead background="white">
        <Container>
          <Headline>{"Datenschutz"}</Headline>
        </Container>
      </Masthead>
      <AboutContainer>
        <Container>
          <Row>
            <ColumnHalf>
              <h5 id="privacy">Datenschutz</h5>

              <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
                personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie
                dieser Datenschutzerklärung.
              </p>

              <p>
                Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf
                unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben
                werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre
                ausdrückliche Zustimmung nicht an Dritte weitergegeben.
              </p>

              <p>
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail)
                Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
                nicht möglich.
              </p>

              <h5>Cookies</h5>

              <p>
                Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen
                Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver
                und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die
                Ihr Browser speichert.
              </p>

              <p>
                Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies“. Sie werden nach Ende
                Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese
                löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.
              </p>

              <p>
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und
                Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell
                ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browser aktivieren. Bei der
                Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
              </p>

              <h5>Newsletterdaten</h5>

              <p>
                Wenn Sie den auf der Webseite angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine
                E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der
                angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind. Weitere Daten
                werden nicht erhoben. Diese Daten verwenden wir ausschließlich für den Versand der angeforderten
                Informationen und geben sie nicht an Dritte weiter.
              </p>

              <p>
                Die erteilte Einwilligung zur Speicherung der Daten, der E-Mail-Adresse sowie deren Nutzung zum Versand
                des Newsletters können Sie jederzeit widerrufen, etwa über den "Austragen"-Link im Newsletter.
              </p>

              <h5>Datenschutzerklärung für die Nutzung von Google Analytics</h5>

              <p>
                Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Inc.,
                1600 Amphitheatre Parkway Mountain View, CA 94043, USA.
              </p>

              <p>
                Google Analytics verwendet so genannte "Cookies". Das sind Textdateien, die auf Ihrem Computer
                gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den
                Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server
                von Google in den USA übertragen und dort gespeichert.
              </p>

              <p>
                Mehr Informationen zum Umgang mit Nutzerdaten bei Google Analytics finden Sie in der
                Datenschutzerklärung von Google:{" "}
                <a href="https://support.google.com/analytics/answer/6004245?hl=de">
                  https://support.google.com/analytics/answer/6004245?hl=de
                </a>
              </p>

              <h5>Browser Plugin</h5>

              <p>
                Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software
                verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche
                Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung
                der durch den Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse)
                an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem Sie das unter dem folgenden
                Link verfügbare Browser- Plugin herunterladen und installieren:{" "}
                <a href="https://tools.google.com/dlpage/gaoptout?hl=de">
                  https://tools.google.com/dlpage/gaoptout?hl=de
                </a>
              </p>

              <p>&nbsp;</p>
            </ColumnHalf>
            <ColumnHalf>
              <h5>Widerspruch gegen Datenerfassung</h5>

              <p>
                Sie können die Erfassung Ihrer Daten durch Google Analytics verhindern, indem Sie auf folgenden Link
                klicken. Es wird ein Opt-Out-Cookie gesetzt, der die Erfassung Ihrer Daten bei zukünftigen Besuchen
                dieser Website verhindert: <a href="javascript:gaOptout();">Google Analytics deaktivieren</a>
              </p>

              <h5>Datenschutzerklärung für die Nutzung von Facebook-Plugins (Like-Button)</h5>

              <p>
                Auf unseren Seiten sind Plugins des sozialen Netzwerks Facebook, Anbieter Facebook Inc., 1 Hacker Way,
                Menlo Park, California 94025, USA, integriert. Die Facebook-Plugins erkennen Sie an dem Facebook-Logo
                oder dem "Like-Button" ("Gefällt mir") auf unserer Seite. Eine Übersicht über die Facebook-Plugins
                finden Sie hier:{" "}
                <a href="http://developers.facebook.com/docs/plugins/">http://developers.facebook.com/docs/plugins/</a>.
              </p>

              <p>
                Wenn Sie unsere Seiten besuchen, wird über das Plugin eine direkte Verbindung zwischen Ihrem Browser und
                dem Facebook-Server hergestellt. Facebook erhält dadurch die Information, dass Sie mit Ihrer IP-Adresse
                unsere Seite besucht haben. Wenn Sie den Facebook "Like-Button" anklicken während Sie in Ihrem Facebook-
                Account eingeloggt sind, können Sie die Inhalte unserer Seiten auf Ihrem Facebook-Profil verlinken.
                Dadurch kann Facebook den Besuch unserer Seiten Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin,
                dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung
                durch Facebook erhalten. Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von
                Facebook unter <a href="http://de-de.facebook.com/policy.php">http://dede. facebook.com/policy.php</a>.
              </p>

              <p>
                Wenn Sie nicht wünschen, dass Facebook den Besuch unserer Seiten Ihrem Facebook-Nutzerkonto zuordnen
                kann, loggen Sie sich bitte aus Ihrem Facebook- Benutzerkonto aus.
              </p>

              <h5>Datenschutzerklärung für die Nutzung von Twitter</h5>

              <p>
                Auf unseren Seiten sind Funktionen des Dienstes Twitter eingebunden. Diese Funktionen werden angeboten
                durch die Twitter Inc., 1355 Market Street, Suite 900, San Francisco, CA 94103, USA. Durch das Benutzen
                von Twitter und der Funktion "Re-Tweet" werden die von Ihnen besuchten Webseiten mit Ihrem
                Twitter-Account verknüpft und anderen Nutzern bekannt gegeben. Dabei werden auch Daten an Twitter
                übertragen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der
                übermittelten Daten sowie deren Nutzung durch Twitter erhalten. Weitere Informationen hierzu finden Sie
                in der Datenschutzerklärung von Twitter unter{" "}
                <a href="http://twitter.com/privacy">http://twitter.com/privacy</a>.
              </p>

              <p>
                Ihre Datenschutzeinstellungen bei Twitter können Sie in den Konto-Einstellungen unter:{" "}
                <a href="http://twitter.com/account/settings">http://twitter.com/account/settings</a> ändern.
              </p>

              <h5>Datenschutzerklärung für die Nutzung von Instagram</h5>

              <p>
                Auf unseren Seiten sind Funktionen des Dienstes Instagram eingebunden. Diese Funktionen werden angeboten
                durch die Instagram Inc., 1601 Willow Road, Menlo Park, CA, 94025, USA integriert. Wenn Sie in Ihrem
                Instagram-Account eingeloggt sind können Sie durch Anklicken des Instagram-Buttons die Inhalte unserer
                Seiten mit Ihrem Instagram- Profil verlinken. Dadurch kann Instagram den Besuch unserer Seiten Ihrem
                Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom
                Inhalt der u?bermittelten Daten sowie deren Nutzung durch Instagram erhalten.
              </p>

              <p>
                Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Instagram:{" "}
                <a href="http://instagram.com/about/legal/privacy/">http://instagram.com/about/legal/privacy/</a>
              </p>

              <p>
                Quelle: <a href="https://www.erecht24.de">https://www.e-recht24.de</a>
              </p>
            </ColumnHalf>
          </Row>
        </Container>
      </AboutContainer>
    </Layout>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query PrivacyQuery {
        masters: allMastersJson {
          ...Masters
        }
      }
    `}
    render={data => <Privacy data={data} />}
  />
);
