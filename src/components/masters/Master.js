import React from "react";
import styled from "styled-components";

const MasterTitle = styled.div`
  font-size: 30px;
  width: 48%;
`;

const MasterCity = styled.div`
  margin-left: 4%;
  width: 22%;
`;

const MasterUniversity = styled.div`
  margin-left: 4%;
  width: 22%;
`;

const MasterContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 40px;
  border-top: 1px solid black;
  display: flex;

  @media (max-width: 550px) {
    flex-direction: column;

    & ${MasterCity} {
      width: 100%;
    }

    & ${MasterUniversity} {
      width: 100%;
      padding-top: 20px;
    }

    & ${MasterTitle} {
      width: 100%;
    }
  }
`;

const example = {
  name: "Advanced Design",
  applicationDeadlines: [{date: "2018-01-15T00:00:00.000Z", international: false, type: "summer"}],
  university: "Hochschule München",
  direction: {degree: "ma", direction: ["practical"], masterType: "consecutive"},
  topicAndFocus: {
    topicFocus: "thematisch",
    functionalComposition: "artAndNonArt",
    allowedDisciplines: "Design, Architektur",
    allowedDisciplinesTag: [
      "room",
      "visualCommunication",
      "digital",
      "filmAndPhotograpy",
      "product",
      "fashion",
      "illustrations",
      "jewelry",
    ],
  },
  timeAndMoney: {allowedForms: ["fullTime"], costs: 0, semester: "3"},
  internationality: {mainLanguages: ["german"], semesterAbroad: "no", doubleDegree: false},
  metadata: {
    website: "http://www.design.hm.edu/studienangebote/master/masterofartsinadvanceddesign.de.html",
    facebook: "https://www.facebook.com/HochschuleMuenchen/?fref=ts",
    instagram: "—",
    twitter: "https://twitter.com/haw_muenchen?lang=de",
  },
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

const MasterDetailSectionTitle = styled.dt``;

const MasterDetailSectionDescription = styled.dd``;

const MasterDetailSection = ({headline, children}) => {
  return (
    <MasterDetailSectionContainer>
      <h4>{headline}</h4>
      <MasterDetailSectionList>{children}</MasterDetailSectionList>
    </MasterDetailSectionContainer>
  );
};

const MasterDetailItem = ({dt, dd}) => {
  return <MasterDetailSectionTitle />;
};

const MasterDetail = ({master, university}) => {
  console.log(master.applicationDeadlines);
  return (
    <MasterDetailContainer>
      <MasterDetailTitle>
        <MasterDetailDegree>{master.direction.degree}</MasterDetailDegree>
        {master.name}
      </MasterDetailTitle>
      <MasterDetailUniversity>
        <MasterDetailSmall>{university.city}</MasterDetailSmall>
        {university.name}
      </MasterDetailUniversity>
      <MasterDetailDeadlines>
        {master.applicationDeadlines
          .map(d => {
            const date = new Date(d.date);
            const month = date.getMonth() + 1;
            const day = date.getDay() + 1;
            return `${date.getFullYear()}.${month < 10 ? "0" + month : month}.${day < 10 ? "0" + day : day}`;
          })
          .join(" & ")}
      </MasterDetailDeadlines>
      <MasterDetailUniversitySection>
        <MasterDetailSection headline={"Hochschule"} />
      </MasterDetailUniversitySection>
      <MasterDetailDirectionSection>
        <MasterDetailSection headline={"Ausrichtung"} />
      </MasterDetailDirectionSection>
      <MasterDetailMoneySection>
        <MasterDetailSection headline={"Zeit und Geld"} />
      </MasterDetailMoneySection>
      <MasterDetailInternationalitySection>
        <MasterDetailSection headline={"Internationalität"} />
      </MasterDetailInternationalitySection>
    </MasterDetailContainer>
  );
};

class Master extends React.Component {
  render() {
    const {master, university} = this.props;
    return (
      <div>
        <MasterContainer>
          <MasterTitle>{master.name}</MasterTitle>
          <MasterUniversity>{master.university}</MasterUniversity>
          <MasterCity>{university.city}</MasterCity>
        </MasterContainer>
        <MasterDetail master={master} university={university} />
      </div>
    );
  }
}

export default Master;
