import React from "react";
import styled, {css} from "styled-components";
import Layout from "../../components/Layout";
import Navbar from "../Navbar";
import Container from "../../components/Container";
import {StaticQuery} from "gatsby";
import Master from "./Master";
import {graphql} from "gatsby";
import {Masthead} from "../Masthead";
import {Headline} from "../Headline";
import {SubHeadline} from "../SubHeadline";
import {FILTERS, filterMasters} from "./filterMasters";
import {empty} from "../../utils/empty";
import {sortAndGroupMasters} from "./sortAndGroupMasters";
import THEME from "../../theme";

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

const FilterMain = styled.div`
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

  &:disabled {
    opacity: 0.3;
    cursor: default;
    pointer-events: none;
  }

  &:hover {
    cursor: pointer;
    background-color: ${p => (p.active ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.3)")};
  }
`;

const FilterText = styled.div`
  display: block;
  position: relative;
  border-bottom: 1px solid transparent;
  &,
  &:visited,
  &:focus {
    color: white;
  }

  &:hover {
    cursor: pointer;
    border-bottom: 1px solid white;
  }

  &:after {
    transition: transform 200ms ease-out;
    position: absolute;
    content: "";
    right: -20px;
    top: 9px;
    border-right: 6px solid transparent;
    border-top: 6px solid white;
    border-bottom: 6px solid transparent;
    border-left: 6px solid transparent;
    transform: rotate(-90deg);
    transform-origin: 5px 4px;

    ${p =>
      p.active &&
      css`
        transform: rotate(0);
      `}
  }
`;

const FilterButtonSection = styled.div`
  display: flex;
`;

const SortSection = styled.div`
  cursor: pointer;
  display: flex;
  position: relative;

  &:hover {
    ${FilterText} {
      border-bottom: 1px solid white;
    }
  }
`;

const SortText = styled.div`
  color: white;
  padding-right: 10px;
`;

const FilterHeader = styled.div`
  background: #9dc9fb;
  z-index: 10;
  position: sticky;
  top: 40px;
`;

const FilterHeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  padding-top: 10px;
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

const SortOptions = styled.div`
  position: absolute;
  width: 160px;
  border: 1px solid black;
  top: 22px;
  z-index: 99;
`;
const SortOption = styled.div`
  padding: 15px;
  background: white;

  &:hover {
    background: #eaeaea;
  }
`;

const GroupHeader = styled.h3`
  color: ${THEME.colors.blue};
  top: 83px;
  position: sticky;
  margin: 0;
  background: white;
  padding: 10px 0;
  border-bottom: 1px solid black;
`;

class Masters extends React.Component {
  state = {
    show: false,
    showSort: false,
    sort: "alphabet",
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

      const disable = count === 0 && !active;

      return (
        <FilterButton
          disabled={disable}
          style={{paddingRight: 50}}
          active={active}
          key={value}
          onClick={disable ? () => {} : this.createToggleFilter(type, value)}
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

    const groupedAndSortedMasters = sortAndGroupMasters(filteredMasters, this.state.sort, universityMap);

    return (
      <Layout>
        <Navbar universityCount={universities.length} masterCount={masters.length} />
        <Masthead>
          <Container>
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
        <FilterHeader>
          <Container>
            <FilterHeaderInner>
              <FilterButtonSection>
                <FilterText active={this.state.show} onClick={this.toggleShow}>
                  {"Filter"}
                </FilterText>
              </FilterButtonSection>
              <SortSection onClick={this.state.showSort ? this.sortHide : this.sortShow}>
                <SortText>{"Sortieren: "}</SortText>
                <FilterText active={true} style={{marginRight: 20}}>
                  {
                    {
                      alphabet: "Studiengang",
                      city: "Studienort",
                      deadline: "Bewerbungsfrist",
                    }[this.state.sort]
                  }
                </FilterText>
                {this.state.showSort && (
                  <SortOptions>
                    <SortOption onClick={() => this.setSort("alphabet")}>{"Studiengang"}</SortOption>
                    <SortOption onClick={() => this.setSort("city")}>{"Studienort"}</SortOption>
                    <SortOption onClick={() => this.setSort("deadline")}>{"Bewerbungsfrist"}</SortOption>
                  </SortOptions>
                )}
              </SortSection>
            </FilterHeaderInner>
          </Container>
        </FilterHeader>
        <FilterMain>
          <Container>
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
        </FilterMain>
        <Container>
          {groupedAndSortedMasters.map(([group, name, masters]) => {
            return (
              <React.Fragment key={group}>
                <GroupHeader>{name}</GroupHeader>
                {masters.map((master, i) => {
                  const university = universityMap[master.university];
                  return <Master key={i} master={master} university={university} />;
                })}
              </React.Fragment>
            );
          })}
        </Container>
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
