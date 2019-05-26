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
import {sortAndGroupMasters, SORT_NAME_MAPPING} from "./sortAndGroupMasters";
import {FILTERS, filterMasters} from "./filterMasters";
import THEME from "../../theme";
import {slugify} from "../../utils/slugify";
import FilterOverlay from "./FilterOverlay";

// need to be changed when style changes
const MAIN_HEADER_HEIGHT = 43;
const FILTER_HEADER_HEIGHT = 43;

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

  /* &:after {
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
  } */
`;

const ResetFilters = styled(FilterText)`
  margin-left: 20px;
  opacity: 0;
  pointer-events: none;
  ${p =>
    p.show &&
    css`
      opacity: 1;
      pointer-events: all;
    `}
  transition: opacity 0.3s;
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
const FilterHeader = styled.div`
  background: ${THEME.colors.blue};
  z-index: 10;
  position: sticky;
  top: ${MAIN_HEADER_HEIGHT}px;
`;

const FilterHeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  padding-top: 10px;
`;

const SortOptions = styled.div`
  position: absolute;
  right: 0;
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
  /* top: 83px; */
  /* position: sticky; */
  margin: 0;
  margin-top: 70px;
  background: white;
  padding: 10px 0;
  border-bottom: 1px solid black;
`;

const EMPTY_FILTERS = {
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
};

class Masters extends React.Component {
  state = {
    show: false,
    showSort: false,
    sort: "alphabet",
    masterId: "",
    filters: EMPTY_FILTERS,
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
    this.scrollToTop();
  };
  resetFilters = () => {
    this.setState({
      filters: EMPTY_FILTERS,
    });
    this.scrollToTop();
  };
  componentWillUnmount() {
    this.hideOverlay();
  }
  showOverlay = () => {
    this.setState({
      show: true,
    });
    document.body.style.overflow = "hidden";
  };
  hideOverlay = () => {
    this.setState({
      show: false,
    });
    document.body.style.overflow = "auto";
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
  scrollToTop() {
    const position = document.getElementById("masters-main");
    const offset = FILTER_HEADER_HEIGHT + MAIN_HEADER_HEIGHT + 70; // 70 is a margin
    const top = position.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({behavior: "auto", left: 0, top});
  }
  setSort = sort => {
    if (sort !== this.state.sort) {
      this.setState({
        sort,
      });
      this.scrollToTop();
    }
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
          const top = position.top + window.scrollY - MAIN_HEADER_HEIGHT - FILTER_HEADER_HEIGHT;
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
    const groupedAndSortedMasters = sortAndGroupMasters(filteredMasters, this.state.sort, universityMap);
    const numberOfFilters = [].concat(...Object.values(this.state.filters)).length;

    const activeFilters = [];
    for (const key of Object.keys(this.state.filters)) {
      const filterGroup = this.state.filters[key];
      for (const activeFilter of filterGroup) {
        const filter = FILTERS[key].find(d => d.value === activeFilter);
        activeFilters.push(filter);
      }
    }

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
        <FilterOverlay
          filters={this.state.filters}
          show={this.state.show}
          universityMap={universityMap}
          masters={masters}
          filteredMasters={filteredMasters}
          toggleFilter={this.toggleFilter}
          close={this.hideOverlay}
        />
        <FilterHeader id="filter-header">
          <Container>
            <FilterHeaderInner>
              <FilterButtonSection>
                <FilterText active={this.state.show} onClick={this.showOverlay}>
                  {`Filter (${numberOfFilters})`}
                </FilterText>
                <ResetFilters onClick={this.resetFilters} show={numberOfFilters > 0}>
                  {"Alle zurücksetzen"}
                </ResetFilters>
              </FilterButtonSection>
              <SortSection onClick={this.state.showSort ? this.sortHide : this.sortShow}>
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
        {/* We give it a min-height of 100vh to make sure the footer is not looking broken when the
        user filters a bit too much */}
        <Container id="masters-main" style={{minHeight: "100vh"}}>
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
