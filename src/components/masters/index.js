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
          allowedDisciplinesTag
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
  position: relative;
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
  cursor: pointer;
  display: flex;
  position: relative;

  &:hover {
    text-decoration: underline;
  }
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

const FILTERS = {
  universityType: [
    {
      type: "universityType",
      value: "university",
      name: "Universität",
      filter: (m, u) => u.type === "university",
    },
    {
      type: "universityType",
      value: "artCollege",
      name: "Kunsthochschule",
      filter: (m, u) => u.type === "artCollege",
    },
    {
      type: "universityType",
      value: "college",
      name: "Fachhochschule",
      filter: (m, u) => u.type === "college",
    },
  ],
  masterType: [
    {
      type: "masterType",
      value: "consecutive",
      name: "Konsektutiv",
      filter: m => m.direction.masterType === "consecutive",
    },
    {
      type: "masterType",
      value: "notConsecutive",
      name: "Nicht konsekutiv",
      filter: m => m.direction.masterType === "notConsecutive",
    },
    {
      type: "masterType",
      value: "studyingFurther",
      name: "Weiterbildend",
      filter: m => m.direction.masterType === "studyingFurther",
    },
  ],
  direction: [
    {
      type: "direction",
      value: "practical",
      name: "Praktisch",
      filter: m => m.direction.direction.includes("practical"),
    },
    {
      type: "direction",
      value: "theoretical",
      name: "Theoretisch",
      filter: m => m.direction.direction.includes("theoretical"),
    },
  ],
  topicFocus: [
    {
      type: "topicFocus",
      value: "fachspezifisch",
      name: "Fachspezifisch",
      filter: m => m.topicAndFocus.topicFocus === "fachspezifisch",
    },
    {
      type: "topicFocus",
      value: "fachuebergreifend",
      name: "Fachübergreifend",
      filter: m => m.topicAndFocus.topicFocus === "fachuebergreifend",
    },
    {
      type: "topicFocus",
      value: "thematisch",
      name: "Thematisch",
      filter: m => m.topicAndFocus.topicFocus === "thematisch",
    },
  ],
  composition: [
    {
      type: "functionalComposition",
      value: "disciplinary",
      name: "Disziplinär",
      filter: m => m.topicAndFocus.functionalComposition === "disciplinary",
    },
    {
      type: "functionalComposition",
      value: "interdisciplinaryArt",
      name: "Interdisziplinär gestalterisch",
      filter: m => m.topicAndFocus.functionalComposition === "interdisciplinaryArt",
    },
    {
      type: "functionalComposition",
      value: "artAndNonArt",
      name: "Gestalterisch & Nicht gestalterisch",
      filter: m => m.topicAndFocus.functionalComposition === "artAndNonArt",
    },
    {
      type: "allowedDisciplinesTag",
      value: "digital",
      name: "Digitale Medien",
      filter: m => m.topicAndFocus.allowedDisciplinesTag.includes("digital"),
    },
    {
      type: "allowedDisciplinesTag",
      value: "filmAndPhotograpy",
      name: "Fotografie/Film",
      filter: m => m.topicAndFocus.allowedDisciplinesTag.includes("filmAndPhotograpy"),
    },
    {
      type: "allowedDisciplinesTag",
      value: "illustrations",
      name: "Illustration",
      filter: m => m.topicAndFocus.allowedDisciplinesTag.includes("illustrations"),
    },
    {
      type: "allowedDisciplinesTag",
      value: "fashion",
      name: "Mode/Textil",
      filter: m => m.topicAndFocus.allowedDisciplinesTag.includes("fashion"),
    },
    {
      type: "allowedDisciplinesTag",
      value: "product",
      name: "Produkt/Industrie",
      filter: m => m.topicAndFocus.allowedDisciplinesTag.includes("product"),
    },
    {
      type: "allowedDisciplinesTag",
      value: "room",
      name: "Raum",
      filter: m => m.topicAndFocus.allowedDisciplinesTag.includes("room"),
    },
    {
      type: "allowedDisciplinesTag",
      value: "jewelry",
      name: "Schmuck",
      filter: m => m.topicAndFocus.allowedDisciplinesTag.includes("jewelry"),
    },
    {
      type: "allowedDisciplinesTag",
      value: "visualCommunication",
      name: "Visuelle Kommunikation",
      filter: m => m.topicAndFocus.allowedDisciplinesTag.includes("visualCommunication"),
    },
  ],
  allowedForms: [
    {
      type: "allowedForms",
      value: "fullTime",
      name: "Vollzeit",
      filter: m => m.timeAndMoney.allowedForms.includes("fullTime"),
    },
    {
      type: "allowedForms",
      value: "partTime",
      name: "Teilzeit",
      filter: m => m.timeAndMoney.allowedForms.includes("partTime"),
    },
    {
      type: "allowedForms",
      value: "extraOccupational",
      name: "Berufsbegleitend",
      filter: m => m.timeAndMoney.allowedForms.includes("extraOccupational"),
    },
    {
      type: "allowedForms",
      value: "remote",
      name: "Fernstudium",
      filter: m => m.timeAndMoney.allowedForms.includes("remote"),
    },
  ],
  semesterType: [
    {
      type: "semesterType",
      value: "summer",
      name: "Sommersemester",
      filter: m => m.applicationDeadlines.some(d => d.type === "summer"),
    },
    {
      type: "semesterType",
      value: "winter",
      name: "Wintersemester",
      filter: m => m.applicationDeadlines.some(d => d.type === "winter"),
    },
  ],
  internationalityEnglish: [
    {
      type: "internationalityEnglish",
      value: "english",
      name: "Englischsprachig",
      filter: m => m.internationality.mainLanguages.includes("english"),
    },
  ],
  internationalitySemesterAbroad: [
    {
      type: "internationalitySemesterAbroad",
      value: "semesterAbroad",
      name: "Intergriertes Auslandssemster",
      filter: m => m.internationality.semesterAbroad !== "no",
    },
  ],
  internationalityDoubleDegree: [
    {
      type: "internationalityDoubleDegree",
      value: "doubleDegree",
      name: "Doppelter Abschluss",
      filter: m => m.internationality.doubleDegree,
    },
  ],
};

const empty = arr => arr.length === 0;

const SortOptions = styled.div`
  position: absolute;
  width: 160px;
  border: 1px solid black;
  top: 22px;
`;
const SortOption = styled.div`
  padding: 15px;
  background: white;

  &:hover {
    background: #eaeaea;
  }
`;

function filterMasters(masters, filters, universityMap) {
  const filteredMasters = masters.filter(m => {
    const university = universityMap[m.university];
    const universityType = empty(filters.universityType) || filters.universityType.includes(university.type);

    const masterType = empty(filters.masterType) || filters.masterType.includes(m.direction.masterType);

    const masterDirection = empty(filters.direction) || filters.direction.some(d => m.direction.direction.includes(d));

    const topicFocus = empty(filters.topicFocus) || filters.topicFocus.includes(m.topicAndFocus.topicFocus);

    const functionalComposition =
      empty(filters.functionalComposition) ||
      filters.functionalComposition.includes(m.topicAndFocus.functionalComposition);

    const allowedDisciplinesTag =
      empty(filters.allowedDisciplinesTag) ||
      filters.allowedDisciplinesTag.some(d => m.topicAndFocus.allowedDisciplinesTag.includes(d));

    const allowedForms =
      empty(filters.allowedForms) || filters.allowedForms.some(d => m.timeAndMoney.allowedForms.includes(d));

    const semesterType =
      empty(filters.semesterType) || filters.semesterType.some(d => m.applicationDeadlines.some(dd => dd.type === d));

    const english = empty(filters.internationalityEnglish) || m.internationality.mainLanguages.includes("english");
    const semesterAbroad = empty(filters.internationalitySemesterAbroad) || m.internationality.semesterAbroad !== "no";
    const doubleDegree = empty(filters.internationalityDoubleDegree) || m.internationality.doubleDegree;

    return (
      universityType &&
      masterType &&
      masterDirection &&
      topicFocus &&
      functionalComposition &&
      allowedDisciplinesTag &&
      allowedForms &&
      semesterType &&
      english &&
      semesterAbroad &&
      doubleDegree
    );
  });
  return filteredMasters;
}

class Masters extends React.Component {
  state = {
    show: false,
    showSort: false,
    sort: "master",
    filters: {
      universityType: [],
      masterType: [],
      direction: [],
      topicFocus: [],
      functionalComposition: [],
      allowedDisciplinesTag: [],
      allowedForms: [],
      semesterType: [],
      internationalityEnglish: [],
      internationalitySemesterAbroad: [],
      internationalityDoubleDegree: [],
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
  sortShow = () => {
    this.setState({
      showSort: true,
    });
  };
  sortHide = () => {
    this.setState({
      showSort: false,
    });
  };
  setSort = sort => {
    this.setState({
      sort,
    });
  };
  render() {
    const masters = this.props.data.masters.edges.map(n => n.node);
    const universities = this.props.data.universities.edges.map(n => n.node);
    const universityMap = enhanceUniversities(universities, masters);

    const filteredMasters = filterMasters(masters, this.state.filters, universityMap);
    console.log(filteredMasters);

    const createButton = ({type, value, name, filter}) => {
      const active = this.state.filters[type].includes(value);
      const isEmpty = empty(this.state.filters[type]);
      // when it is not empty, we can find out how mich will be added when clicking the button
      // for this we clone the current filters and add ourselves to it
      const filtersWithCurrent = {
        ...this.state.filters,
        [type]: [value].concat(this.state.filters[type]),
      };

      let count = 0;
      if (isEmpty || !active) {
        count = isEmpty
          ? filteredMasters.filter(m => filter(m, universityMap[m.university])).length
          : filterMasters(masters, filtersWithCurrent, universityMap).length - filteredMasters.length;
      }

      return (
        <FilterButton
          style={{paddingRight: 50}}
          active={active}
          key={value}
          onClick={this.createToggleFilter(type, value)}
        >
          {name}{" "}
          {!active && (
            <span style={{position: "absolute", right: 45, top: 10, transform: "translate(100%)"}}>
              {isEmpty ? `(${count})` : `(+${count})`}
            </span>
          )}
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
              <SortSection onClick={this.state.showSort ? this.sortHide : this.sortShow}>
                <SortText>{"Sortieren: "}</SortText>
                {
                  {
                    master: "Studiengang",
                    city: "Studienort",
                    applicationDeadline: "Bewerbungsfrist",
                  }[this.state.sort]
                }
                {this.state.showSort && (
                  <SortOptions>
                    <SortOption onClick={() => this.setSort("master")}>{"Studiengang"}</SortOption>
                    <SortOption onClick={() => this.setSort("city")}>{"Studienort"}</SortOption>
                    <SortOption onClick={() => this.setSort("applicationDeadline")}>{"Bewerbungsfrist"}</SortOption>
                  </SortOptions>
                )}
              </SortSection>
            </FilterHeader>
            <div style={{display: this.state.show ? "block" : "none"}}>
              <FilterSection>
                <FilterSectionTitle>{"Hochschule"}</FilterSectionTitle>
                <FilterSectionButtons>{FILTERS.universityType.map(createButton)}</FilterSectionButtons>
              </FilterSection>
              <FilterSection>
                <FilterSectionTitle>{"Mastertyp"}</FilterSectionTitle>
                <FilterSectionButtons>{FILTERS.masterType.map(createButton)}</FilterSectionButtons>
              </FilterSection>
              <FilterSection>
                <FilterSectionTitle>{"Ausrichtung"}</FilterSectionTitle>
                <FilterSectionButtons>{FILTERS.direction.map(createButton)}</FilterSectionButtons>
              </FilterSection>
              <FilterSection>
                <FilterSectionTitle>{"Inhaltlicher Fokus"}</FilterSectionTitle>
                <FilterSectionButtons>{FILTERS.topicFocus.map(createButton)}</FilterSectionButtons>
              </FilterSection>
              <FilterSection>
                <FilterSectionTitle>{"Disziplinäre Zusammensetzung"}</FilterSectionTitle>
                <FilterSectionButtons>{FILTERS.composition.map(createButton)}</FilterSectionButtons>
              </FilterSection>
              <FilterSection>
                <FilterSectionTitle>{"Studienform"}</FilterSectionTitle>
                <FilterSectionButtons>{FILTERS.allowedForms.map(createButton)}</FilterSectionButtons>
              </FilterSection>
              <FilterSection>
                <FilterSectionTitle>{"Zulassungssemester"}</FilterSectionTitle>
                <FilterSectionButtons>{FILTERS.semesterType.map(createButton)}</FilterSectionButtons>
              </FilterSection>
              <FilterSection>
                <FilterSectionTitle>{"Internationailtät"}</FilterSectionTitle>
                <FilterSectionButtons>
                  {FILTERS.internationalityEnglish
                    .map(createButton)
                    .concat(FILTERS.internationalitySemesterAbroad.map(createButton))
                    .concat(FILTERS.internationalityDoubleDegree.map(createButton))}
                </FilterSectionButtons>
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
