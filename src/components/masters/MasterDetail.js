import React from "react";
import styled from "styled-components";
import {HouseIcon, InstagramIcon, FacebookIcon, TwitterIcon, SaveIcon} from "../Icons";
import {Link} from "gatsby";
import {formatDate} from "../../utils/formatDate";

import {
  universityTypeTranslation,
  masterTypeTranslation,
  masterDirectionTranslation,
  allowedFormsTranslation,
  semesterTypeTranslation,
  semesterAbroadTranslation,
  mainLanguagesTranslation,
  functionalCompositionTranslation,
  masterTranslation,
  topicAndFocusTranslation,
} from "./translations";
import THEME from "../../theme";

function formatMoney(n) {
  return `${n} €`;
}

const MasterDetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "master-links ."
    "master-university-section master-direction-section"
    "master-money-section master-internationality-section";

  grid-column-gap: 40px;

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "master-links"
      "master-university-section"
      "master-direction-section"
      "master-money-section"
      "master-internationality-section";
  }
`;

const MasterDetailHeadline = styled.h3`
  font-size: 24px;
  margin: 0;
  padding: 0;
  padding-bottom: 20px;
`;
const MasterDetailLinks = styled(MasterDetailHeadline)`
  display: flex;
  justify-content: space-between;
  grid-area: master-links;
`;
const MasterDetailUniversitySection = styled.div`
  grid-area: master-university-section;
`;
const MasterDetailDirectionSection = styled.div`
  grid-area: master-direction-section;
`;
const MasterDetailMoneySection = styled.div`
  grid-area: master-money-section;
`;
const MasterDetailInternationalitySection = styled.div`
  grid-area: master-internationality-section;
`;
const MasterDetailSectionContainer = styled.div`
  & > h4 {
    border-bottom: 1px solid black;
  }
`;
const MasterDetailSectionList = styled.dl``;
const MasterDetailSectionTitle = styled.dt`
  font-weight: bold;
`;
const MasterDetailSectionDescription = styled.dd`
  padding: 0;
  margin: 0;
  padding-top: 5px;
  padding-bottom: 20px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      padding-bottom: 5px;
    }
  }
`;
const MasterDetailSection = ({headline, listItems, children}) => {
  return (
    <MasterDetailSectionContainer>
      <h4>{headline}</h4>
      <MasterDetailSectionList>
        {listItems
          ? listItems.map(([label, description]) => {
              return (
                <React.Fragment key={label}>
                  <MasterDetailSectionTitle>{label}</MasterDetailSectionTitle>
                  <MasterDetailSectionDescription>{description}</MasterDetailSectionDescription>
                </React.Fragment>
              );
            })
          : null}
        {children}
      </MasterDetailSectionList>
    </MasterDetailSectionContainer>
  );
};

const SaveIconContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const MasterDetail = ({master, university, save, saved}) => {
  const mastersSameUniversity = university.masters.filter(d => d.name !== master.name);
  return (
    <MasterDetailContainer>
      <MasterDetailLinks>
        <div>
          <HouseIcon href={master.metadata.website} style={{marginRight: 10}} />
          <TwitterIcon href={master.metadata.twitter} style={{marginRight: 10}} />
          <InstagramIcon href={master.metadata.instagram} style={{marginRight: 10}} />
          <FacebookIcon href={master.metadata.facebook} style={{marginRight: 10}} />
        </div>
        <SaveIconContainer>
          {/* <SaveIcon onClick={save} fill={saved ? THEME.colors.orange : "black"} /> */}
        </SaveIconContainer>
      </MasterDetailLinks>
      <MasterDetailUniversitySection>
        <MasterDetailSection
          headline={"Hochschule"}
          listItems={[
            ["Hochschultyp", universityTypeTranslation[university.type]],
            ["Fachbereich", master.universityDetails.department],
            ["Hochschulübergreifend", master.universityDetails.otherUniversity],
          ]}
        >
          <MasterDetailSectionTitle>{"Andere Masterstudiengänge"}</MasterDetailSectionTitle>
          <MasterDetailSectionDescription>
            {mastersSameUniversity.length > 0 ? (
              <ul>
                {mastersSameUniversity.map(m => {
                  return (
                    <li key={m.id}>
                      <Link to={`/#${m.id}`}>{`${m.name} - ${masterTranslation[m.direction.degree]}`}</Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              "-"
            )}
          </MasterDetailSectionDescription>
        </MasterDetailSection>
      </MasterDetailUniversitySection>
      <MasterDetailDirectionSection>
        <MasterDetailSection
          headline={"Ausrichtung"}
          listItems={[
            ["Mastertyp", masterTypeTranslation[master.direction.masterType]],
            ["Ausrichtung", master.direction.direction.map(d => masterDirectionTranslation[d]).join(" & ")],
            ["Inhaltlicher Fokus", topicAndFocusTranslation[master.topicAndFocus.topicFocus]],
            [
              "Disziplinäre Zusammensetzung",
              functionalCompositionTranslation[master.topicAndFocus.functionalComposition],
            ],
            ["Zugelassene Disziplinen", master.topicAndFocus.allowedDisciplines.normalize()],
          ]}
        />
      </MasterDetailDirectionSection>
      <MasterDetailMoneySection>
        <MasterDetailSection
          headline={"Zeit und Geld"}
          listItems={[
            ["Studienform", master.timeAndMoney.allowedForms.map(d => allowedFormsTranslation[d]).join(" & ")],
            ["Regelstudienzeit", master.timeAndMoney.semester],
            [
              "Zulassungssemester",
              master.timeAndMoney.applicationDeadlines.length >= 2
                ? semesterTypeTranslation.summerwinter
                : semesterTypeTranslation[master.timeAndMoney.applicationDeadlines[0].type],
            ],
            ["Gebühren", master.timeAndMoney.costs === 0 ? "-" : formatMoney(master.timeAndMoney.costs)],
          ]}
        />
      </MasterDetailMoneySection>
      <MasterDetailInternationalitySection>
        <MasterDetailSection
          headline={"Internationalität"}
          listItems={[
            [
              "Hauptunterrichtssprache",
              master.internationality.mainLanguages.map(d => mainLanguagesTranslation[d]).join(" & "),
            ],
            ["Integriertes Auslandssemester", semesterAbroadTranslation[master.internationality.semesterAbroad]],
            ["Doppelabschluss", master.internationality.doubleDegree ? "Ja" : "Nein"],
          ]}
        />
      </MasterDetailInternationalitySection>
    </MasterDetailContainer>
  );
};

export default MasterDetail;
