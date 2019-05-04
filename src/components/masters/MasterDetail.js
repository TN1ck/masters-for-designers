import React from "react";
import styled from "styled-components";

function formatDate(d) {
  const date = new Date(d);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${year}`;
}

function formatMoney(n) {
  return `${n} €`;
}

const allowedDisciplinesTagTranslation = {
  digital: "Digitale Medien",
  filmAndPhotograpy: "Film/Fotografie",
  illustrations: "Illustrationen",
  fashion: "Mode/Textil",
  product: "Produkt/Industrie",
  room: "Raum",
  jewelry: "Schmuck",
  visualCommunication: "Visuelle Kommunikation",
};

const masterTranslation = {
  ma: "MA",
  msc: "MSc",
  mfa: "MFA",
};

const universityTypeTranslation = {
  university: "Universität",
  artCollege: "Kunsthochschule",
  college: "Fachhochschule",
};

const functionalCompositionTranslation = {
  disciplinary: "Disziplinär",
  interdisciplinaryArt: "Interdisziplinär gestalterisch",
  artAndNonArt: "Gestalterisch & nicht-gestalterisch",
};

const masterTypeTranslation = {
  consecutive: "Konsekutiv",
  notConsecutive: "Nicht Konsekutiv",
  studyingFurther: "Weiterbildend",
};

const masterDirectionTranslation = {
  practical: "Praktisch",
  theoretical: "Theoretisch",
};

const mainLanguagesTranslation = {
  german: "Deutsch",
  english: "Englisch",
};

const topicAndFocusTranslation = {
  fachspezifisch: "Fachspezifisch",
  fachuebergreifend: "Fachübergreifend",
  thematisch: "Thematisch",
};

const semesterTypeTranslation = {
  summer: "Sommersemester",
  winter: "Wintersemester",
};

const allowedFormsTranslation = {
  fullTime: "Vollzeit",
  partTime: "Teilzeit",
  extraOccupational: "Berufsbegleitend",
  remote: "Ferstudium",
};

const semesterAbroadTranslation = {
  yes: "Ja",
  no: "Nein",
  choose: "Wahlweise",
};

const MasterDetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "master-title master-title"
    ". master-university"
    "master-date ."
    "master-university-section master-direction-section"
    "master-money-section master-internationality-section";

  grid-column-gap: 40px;

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "master-title"
      "master-university"
      "master-date"
      "master-university-section"
      "master-direction-section"
      "master-money-section"
      "master-internationality-section";
  }
`;

const MasterDetailSmall = styled.small`
  font-weight: 300;
  display: block;
  font-size: 12px;
`;
const MasterDetailHeadline = styled.h3`
  font-weight: 400;
  font-size: 24px;
  margin: 0;
  padding: 0;
  padding-bottom: 20px;
`;
const MasterDetailDegree = styled(MasterDetailSmall)`
  text-transform: uppercase;
  font-style: italic;
`;
const MasterDetailTitle = styled(MasterDetailHeadline)`
  grid-area: master-title;
`;
const MasterDetailUniversity = styled(MasterDetailHeadline)`
  grid-area: master-university;
`;
const MasterDetailDeadlines = styled(MasterDetailHeadline)`
  grid-area: master-date;
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
  font-weight: 400;
`;
const MasterDetailSectionDescription = styled.dd`
  padding: 0;
  margin: 0;
  padding-top: 5px;
  padding-bottom: 20px;
  text-transform: capitalize;
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

const MasterDetail = ({master, university}) => {
  const mastersSameUniversity = university.masters.filter(d => d.name !== master.name);
  console.log(master);
  return (
    <MasterDetailContainer>
      <MasterDetailTitle>
        <MasterDetailDegree>{masterTranslation[master.direction.degree]}</MasterDetailDegree>
        {master.name}
      </MasterDetailTitle>
      <MasterDetailUniversity>
        <MasterDetailSmall>{university.city}</MasterDetailSmall>
        {university.name}
      </MasterDetailUniversity>
      <MasterDetailDeadlines>
        {master.applicationDeadlines.map(d => formatDate(d.date)).join(" & ")}
      </MasterDetailDeadlines>
      <MasterDetailUniversitySection>
        <MasterDetailSection
          headline={"Hochschule"}
          listItems={[
            ["Hochschultyp", universityTypeTranslation[university.type]],
            ["Fachbereich", master.department],
            ["Hochschulübergreifend", master.otherUniversity],
          ]}
        >
          <MasterDetailSectionTitle>{"Andere Masterstudiengänge"}</MasterDetailSectionTitle>
          <MasterDetailSectionDescription>
            {mastersSameUniversity.length > 0 ? (
              <ul>
                {mastersSameUniversity.map(m => {
                  return (
                    <li key={m.name}>
                      <a href={`/#${m.name}`}>{`${m.name} - ${masterTranslation[m.direction.degree]}`}</a>
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
            [
              "Disziplinen",
              master.topicAndFocus.allowedDisciplinesTag
                .map(d => {
                  return allowedDisciplinesTagTranslation[d];
                })
                .join(", "),
            ],
          ]}
        />
      </MasterDetailDirectionSection>
      <MasterDetailMoneySection>
        <MasterDetailSection
          headline={"Zeit und Geld"}
          listItems={[
            ["Studienform", master.timeAndMoney.allowedForms.map(d => allowedFormsTranslation[d]).join(" & ")],
            ["Regelstudienzeit", master.timeAndMoney.semester],
            ["Zulassungssemester", master.applicationDeadlines.map(d => semesterTypeTranslation[d.type]).join(" & ")],
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
            ["Doppelter Abschluss", master.internationality.doubleDegree ? "Ja" : "Nein"],
          ]}
        />
      </MasterDetailInternationalitySection>
    </MasterDetailContainer>
  );
};

export default MasterDetail;
