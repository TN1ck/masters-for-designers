import React from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import Navbar from "./Navbar";
import Container from "../../components/Container";
import {StaticQuery} from "gatsby";
import Master from "./Master";
import {graphql} from "gatsby";
import {Masthead} from "./Masthead";
import {Headline} from "./Headline";
import {SubHeadline} from "./SubHeadline";

export const mastersQuery = graphql`
  fragment Masters on MastersJsonConnection {
    edges {
      node {
        name
        university
        department
        otherUniversity
        applicationDeadlines {
          date
          international
          type
        }
        internationality {
          semesterAbroad
          doubleDegree
          mainLanguages
        }
        timeAndMoney {
          costs
          semester
          allowedForms
        }
        direction {
          degree
          masterType
          direction
        }
        topicAndFocus {
          topicFocus
          functionalComposition
          allowedDisciplines
        }
        metadata {
          website
          facebook
          instagram
          twitter
        }
      }
    }
  }
`;

export const universityQuery = graphql`
  fragment Universities on SchoolsJsonConnection {
    edges {
      node {
        id
        name
        city
        address
        type
        longitude
        latitude
      }
    }
  }
`;

export const enhanceUniversities = (universities, masters) => {
  const universityMap = {};
  for (const university of universities) {
    university.masters = [];
    universityMap[university.name] = university;
  }

  for (const master of masters) {
    const university = universityMap[master.university];
    university.masters.push(master);
  }
  return universityMap;
};

const FilterContainer = styled.div`
  padding-top: 20px;
  background: #9dc9fb;
`;

const FilterButton = styled.button`
  font-family: "L10";
  font-weight: 400;
  font-size: 12px;
  background-color: ${p => (p.active ? "rgba(255, 255, 255. 1)" : " rgba(255, 255, 255, 0)")};
  transition: background-color 100ms ease-out;
  border: 1px solid black;
  padding: 10px 20px;

  &:hover {
    cursor: pointer;
    background-color: ${p => (p.active ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.3)")};
  }
`;

const FilterText = styled.div`
  padding-right: 40px;
`;

const FilterButtonSection = styled.div`
  display: flex;
`;

const SortSection = styled.div`
  display: flex;
`;

const SortText = styled.div`
  padding-right: 10px;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 60px;
`;

const FilterSection = styled.div`
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const FilterSectionTitle = styled.div`
  flex-basis: 170px;
  flex-shrink: 0;
`;
const FilterSectionButtons = styled.div`
  & ${FilterButton} {
    margin-right: 10px;
    margin-bottom: 10px;
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

const empty = arr => arr.length === 0;

class Masters extends React.Component {
  state = {
    show: false,
    filters: {
      universityType: [],
      masterType: [],
      direction: [],
      topicFocus: [],
      functionalComposition: [],
      allowedDisciplinesTag: [],
      allowedForms: [],
      semesterType: [],
      internationality: [],
    },
  };
  toggleFilter = (type, value) => {
    const active = this.state.filters[type].includes(value);
    if (active) {
      this.setState({
        filters: {
          ...this.state.filters,
          [type]: this.state.filters[type].filter(d => d !== value),
        },
      });
    } else {
      this.setState({
        filters: {
          ...this.state.filters,
          [type]: [value].concat(this.state.filters[type]),
        },
      });
    }
  };
  createToggleFilter = (type, value) => {
    return e => {
      e.preventDefault();
      this.toggleFilter(type, value);
    };
  };
  toggleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  render() {
    const masters = this.props.data.masters.edges.map(n => n.node);
    const universities = this.props.data.universities.edges.map(n => n.node);
    const universityMap = enhanceUniversities(universities, masters);

    const filteredMasters = masters.filter(m => {
      const university = universityMap[m.university];
      const universityType =
        empty(this.state.filters.universityType) || this.state.filters.universityType.includes(university.type);
      const masterType =
        empty(this.state.filters.masterType) || this.state.filters.masterType.includes(m.direction.masterType);
      return universityType && masterType;
    });

    const filters = {
      universityType: [
        {type: "universityType", value: "university", name: "Universität"},
        {type: "universityType", value: "artCollege", name: "Kunsthochschule"},
        {type: "universityType", value: "college", name: "Fachhochschule"},
      ],
      masterType: [
        {type: "masterType", value: "consecutive", name: "Konsektutiv"},
        {type: "masterType", value: "notConsecutive", name: "Nicht konsekutiv"},
        {type: "masterType", value: "studyingFurther", name: "Weiterbildend"},
      ],
      direction: [
        {type: "direction", value: "practical", name: "Praktisch"},
        {type: "direction", value: "theoretical", name: "Theoretisch"},
        {type: "direction", value: "thematic", name: "Thematisch"},
      ],
      topicFocus: [
        {type: "topicFocus", value: "disciplinary", name: "Fachspezifisch"},
        {type: "topicFocus", value: "interdisciplinary", name: "Fachübergreifend"},
        {type: "topicFocus", value: "thematic", name: "Thematisch"},
      ],
      composition: [
        {type: "functionalComposition", value: "disciplinary", name: "Disziplinär"},
        {
          type: "functionalComposition",
          value: "interdisciplinaryArt",
          name: "Interdisziplinär gestalterisch",
        },
        {
          type: "functionalComposition",
          value: "artAndNonArt",
          name: "Gestalterisch & Nicht gestalterisch",
        },
        {type: "allowedDisciplinesTag", value: "digital", name: "Digitale Medien"},
        {type: "allowedDisciplinesTag", value: "filmAndPhotograpy", name: "Fotografie/Film"},
        {type: "allowedDisciplinesTag", value: "illustrations", name: "Illustration"},
        {type: "allowedDisciplinesTag", value: "fashion", name: "Mode/Textil"},
        {type: "allowedDisciplinesTag", value: "product", name: "Produkt/Industrie"},
        {type: "allowedDisciplinesTag", value: "room", name: "Raum"},
        {type: "allowedDisciplinesTag", value: "jewelry", name: "Schmuck"},
        {type: "allowedDisciplinesTag", value: "visualCommunication", name: "Visuelle Kommunikation"},
      ],
      allowedForms: [
        {type: "allowedForms", value: "fullTime", name: "Vollzeit"},
        {type: "allowedForms", value: "partTime", name: "Teilzeit"},
        {type: "allowedForms", value: "extraOccupational", name: "Berufsbegleitend"},
        {type: "allowedForms", value: "remote", name: "Fernstudium"},
      ],
      semesterType: [
        {type: "semesterType", value: "summer", name: "Sommersemester"},
        {type: "semesterType", value: "winter", name: "Wintersemester"},
      ],
      internationality: [
        {type: "internationality", value: "english", name: "Englischsprachig"},
        {type: "internationality", value: "semesterAbroad", name: "Intergriertes Auslandssemster"},
        {type: "internationality", value: "doubleDegree", name: "Doppelter Abschluss"},
      ],
    };

    const createButton = ({type, value, name}) => {
      const active = this.state.filters[type].includes(value);
      return (
        <FilterButton active={active} key={value} onClick={this.createToggleFilter(type, value)}>
          {name}
        </FilterButton>
      );
    };

    return (
      <Layout>
        <Masthead>
          <Container>
            <Navbar universityCount={universities.length} masterCount={masters.length} />
            <Headline>
              <i>{"M"}</i>
              {"asters for"}
              <br />
              <i>{"D"}</i>
              {"esigners"}
            </Headline>
            <SubHeadline>
              {
                "MD bietet einen Überblick über alle für Designer zugänglichen Masterstudiengänge an staatlichen Hochschulen in Deutschland."
              }
            </SubHeadline>
          </Container>
        </Masthead>
        <FilterContainer>
          <Container>
            <FilterHeader>
              <FilterButtonSection>
                <FilterText>{"Filter: "}</FilterText>
                <FilterButton onClick={this.toggleShow}>{this.state.show ? "hide all" : "show all"}</FilterButton>
              </FilterButtonSection>
              <SortSection>
                <SortText>{"Sortieren: "}</SortText>
                {"Studiengang"}
              </SortSection>
            </FilterHeader>
            <div style={{display: this.state.show ? "block" : "none"}}>
              <FilterSection>
                <FilterSectionTitle>{"Hochschule"}</FilterSectionTitle>
                <FilterSectionButtons>{filters.universityType.map(createButton)}</FilterSectionButtons>
              </FilterSection>
              <FilterSection>
                <FilterSectionTitle>{"Mastertyp"}</FilterSectionTitle>
                <FilterSectionButtons>{filters.masterType.map(createButton)}</FilterSectionButtons>
              </FilterSection>
              <FilterSection>
                <FilterSectionTitle>{"Ausrichtung"}</FilterSectionTitle>
                <FilterSectionButtons>{filters.direction.map(createButton)}</FilterSectionButtons>
              </FilterSection>
              <FilterSection>
                <FilterSectionTitle>{"Inhaltlicher Fokus"}</FilterSectionTitle>
                <FilterSectionButtons>{filters.topicFocus.map(createButton)}</FilterSectionButtons>
              </FilterSection>
              <FilterSection>
                <FilterSectionTitle>{"Disziplinäre Zusammensetzung"}</FilterSectionTitle>
                <FilterSectionButtons>{filters.composition.map(createButton)}</FilterSectionButtons>
              </FilterSection>
              <FilterSection>
                <FilterSectionTitle>{"Studienform"}</FilterSectionTitle>
                <FilterSectionButtons>{filters.allowedForms.map(createButton)}</FilterSectionButtons>
              </FilterSection>
              <FilterSection>
                <FilterSectionTitle>{"Zulassungssemester"}</FilterSectionTitle>
                <FilterSectionButtons>{filters.semesterType.map(createButton)}</FilterSectionButtons>
              </FilterSection>
              <FilterSection>
                <FilterSectionTitle>{"Internationailtät"}</FilterSectionTitle>
                <FilterSectionButtons>{filters.internationality.map(createButton)}</FilterSectionButtons>
              </FilterSection>
            </div>
          </Container>
        </FilterContainer>
        {filteredMasters.map((master, i) => {
          const university = universityMap[master.university];
          return (
            <Container key={i}>
              <Master master={master} university={university} />
            </Container>
          );
        })}
      </Layout>
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query MastersQuery {
        masters: allMastersJson {
          ...Masters
        }
        universities: allSchoolsJson {
          ...Universities
        }
      }
    `}
    render={data => <Masters data={data} />}
  />
);
