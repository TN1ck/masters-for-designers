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
import {sortAndGroupMasters, SORT_NAME_MAPPING} from "./sortAndGroupMasters";
import THEME from "../../theme";
import {slugify} from "../../utils/slugify";

export const mastersQuery = graphql`
  fragment Masters on MastersJsonConnection {
    edges {
      node {
        name
        universityName
        universityDetails {
          department
          otherUniversity
        }
        direction {
          degree
          masterType
          direction
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
          applicationDeadlines {
            date
            international
            type
          }
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
    const university = universityMap[master.universityName];
    university.masters.push(master);
  }
  return universityMap;
};

const FilterMain = styled.div`
  background: ${THEME.colors.blue};
`;

const FilterButton = styled.button`
  position: relative;
  font-weight: 500;
  font-size: 12px;
  background-color: ${p => (p.active ? "rgba(255, 255, 255. 1)" : " rgba(255, 255, 255, 0)")};
  transition: background-color 100ms ease-out;
  border-radius: 20px;
  border: 1px solid black;
  padding: 5px 15px;

  &:focus {
    outline: none;
    background-color: ${p => (p.active ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.3)")};
  }

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
    color: black;
  }

  &:hover {
    cursor: pointer;
    border-bottom: 1px solid black;
  }

  &:after {
    transition: transform 200ms ease-out;
    position: absolute;
    content: "";
    right: -20px;
    top: 9px;
    border-right: 6px solid transparent;
    border-top: 6px solid black;
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
      border-bottom: 1px solid black;
    }
  }
`;

const SortText = styled.div`
  color: black;
  padding-right: 10px;
`;

const FilterHeader = styled.div`
  background: ${THEME.colors.blue};
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
  width: 180px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  top: 33px;
  z-index: 99;
  background: ${THEME.colors.blue};
`;
const SortOption = styled.div`
  padding: 8px 15px;
  color: ${p => (p.active ? "white" : "black")};

  &:hover {
    color: white;
  }
`;

const GroupHeader = styled.h3`
  color: ${THEME.colors.blue};
  top: 83px;
  position: sticky;
  margin: 0;
  margin-top: 70px;
  background: white;
  padding: 10px 0;
  border-bottom: 1px solid black;
`;

class Masters extends React.Component {
  state = {
    show: false,
    showSort: false,
    sort: "alphabet",
    masterId: "",
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
    const main = document.getElementById("masters-main");
    const position = main.getBoundingClientRect();
    const scroll = window.scrollY;
    if (position.top < 60) {
      const filterMain = document.getElementById("filter-main");
      const top = filterMain.getBoundingClientRect().top + scroll;
      window.scrollTo({left: 0, top: top - 80, behavior: "smooth"});
      this.setState({
        show: true,
      });
    } else {
      this.setState({
        show: !this.state.show,
      });
    }
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
  toggleMaster = id => {
    if (this.state.masterId === id) {
      this.setState({
        masterId: "",
      });
      return;
    }

    // because we close old masters again, we have to do a lot more
    // for smooth scrolling
    const element = document.getElementById(id);
    const positionOld = element.getBoundingClientRect();
    const oldMasterId = this.state.masterId;
    this.setState(
      {
        masterId: id,
      },
      () => {
        if (oldMasterId !== "") {
          const element = document.getElementById(id);
          const positionNew = element.getBoundingClientRect();
          const offset = positionOld.top - positionNew.top;
          console.log("offset", offset);
          const quicklyScrollTo = window.scrollY - offset;
          window.scrollTo({behavior: "auto", left: 0, top: quicklyScrollTo});
          console.log("quicly scroll to", quicklyScrollTo);
        }
        setTimeout(() => {
          const position = element.getBoundingClientRect();
          const top = position.top + window.scrollY - 120;
          console.log("slowly scroll to", top);
          window.scrollTo({left: 0, top: top, behavior: "smooth"});
        });
      },
    );
  };
  render() {
    const masters = this.props.data.masters.edges
      .map(n => n.node)
      .map(m => {
        const id = `master-${slugify(m.universityName)}-${slugify(m.name)}`;
        m.id = id;
        return m;
      });
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
          ? filteredMasters.filter(m => filter(m, universityMap[m.universityName])).length
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
            <span style={{position: "absolute", right: 45, top: 4, transform: "translate(100%)"}}>
              {isEmpty ? `(${count})` : `(+${count})`}
            </span>
          )}
        </FilterButton>
      );
    };

    const groupedAndSortedMasters = sortAndGroupMasters(filteredMasters, this.state.sort, universityMap);

    return (
      <Layout>
        <Navbar universityCount={universities.length} masterCount={filteredMasters.length} />
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
                {/* <SortText>{"Sortieren: "}</SortText> */}
                <FilterText active={true} style={{marginRight: 20}}>
                  {SORT_NAME_MAPPING[this.state.sort]}
                </FilterText>
                {this.state.showSort && (
                  <SortOptions>
                    {[{value: "alphabet"}, {value: "city"}, {value: "university"}, {value: "deadline"}].map(
                      ({value}) => {
                        const active = this.state.sort === value;
                        return (
                          <SortOption key={value} active={active} onClick={() => this.setSort(value)}>
                            {SORT_NAME_MAPPING[value]}
                          </SortOption>
                        );
                      },
                    )}
                  </SortOptions>
                )}
              </SortSection>
            </FilterHeaderInner>
          </Container>
        </FilterHeader>
        <FilterMain id="filter-main">
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
        <Container id="masters-main">
          {groupedAndSortedMasters.map(([group, name, masters]) => {
            return (
              <React.Fragment key={group}>
                <GroupHeader>{name}</GroupHeader>
                {masters.map((master, i) => {
                  const university = universityMap[master.universityName];
                  const active = master.id === this.state.masterId;
                  return (
                    <Master
                      active={active}
                      onClick={() => this.toggleMaster(master.id)}
                      key={i}
                      master={master}
                      university={university}
                    />
                  );
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
