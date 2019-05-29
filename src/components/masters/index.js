import React from "react";
import styled, {css} from "styled-components";
import Layout from "../../components/Layout";
import Navbar from "../Navbar";
import Container from "../../components/Container";
import {StaticQuery, navigate} from "gatsby";
import Master from "./Master";
import {graphql} from "gatsby";
import {Masthead} from "../Masthead";
import {Headline} from "../Headline";
import {SubHeadline} from "../SubHeadline";
import {sortAndGroupMasters, SORT_NAME_MAPPING} from "./sortAndGroupMasters";
import {FILTERS, filterMasters} from "./filterMasters";
import THEME from "../../theme";
import {saveMasters, getSavedMasters} from "../../storage";
import FilterOverlay from "./FilterOverlay";
import MastersDataEnhancer from "./MastersDataEnhancer";
import {GroupHeader, MAIN_HEADER_HEIGHT, FILTER_HEADER_HEIGHT} from "./styles";
import scrollTo from "../../utils/scrollTo";

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

  ${p =>
    p.showArrow &&
    css`
      margin-right: 20px;
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
        transform: rotate(0deg);
        transform-origin: 5px 4px;
    /*
        ${p =>
          p.active &&
          css`
            transform: rotate(90);
          `} */
      }
  `}
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

  @media (max-width: 800px) {
    display: none;
  }
`;

const FilterButtonSection = styled.div`
  display: flex;
`;

const SortSection = styled.div`
  cursor: pointer;
  display: flex;
  position: relative;

  @media not all and (hover: none) {
    &:hover {
      ${FilterText} {
        border-bottom: 1px solid black;
      }
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
  padding-bottom: 16px;
  padding-top: 16px;
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
    masterIds: [],
    filters: EMPTY_FILTERS,
    saved: getSavedMasters(),
  };
  componentDidMount() {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash !== "") {
        const id = hash.substring(1);
        const element = document.getElementById(id);
        const position =
          element.getBoundingClientRect().top + window.scrollY - MAIN_HEADER_HEIGHT - FILTER_HEADER_HEIGHT;
        this.toggleMaster(id);
        window.scrollTo({top: position, left: 0, behaviour: "auto"});
      }
    }
  }
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
    if (this.state.masterIds.includes(id)) {
      this.setState({
        masterIds: this.state.masterIds.filter(i => i !== id),
      });
      return;
    }

    // because we close old masters again, we have to do a lot more
    // for smooth scrolling
    this.setState(
      {
        masterIds: [id].concat(this.state.masterIds),
      },
      () => {
        // deactivate for now, it's problematic in a lot of ways
        // const positionOld = element.getBoundingClientRect();
        // const oldMasterId = this.state.masterId;
        // if (oldMasterId !== "") {
        //   const element = document.getElementById(id);
        //   const positionNew = element.getBoundingClientRect();
        //   const offset = positionOld.top - positionNew.top;
        //   const quicklyScrollTo = window.scrollY - offset;
        //   window.scrollTo({behavior: "auto", left: 0, top: quicklyScrollTo});
        // }
        setTimeout(() => {
          const element = document.getElementById(id);
          const position = element.getBoundingClientRect();
          const top = position.top + window.scrollY - MAIN_HEADER_HEIGHT - FILTER_HEADER_HEIGHT;
          scrollTo(top);
        });
      },
    );
  };
  save = id => {
    if (this.state.saved.includes(id)) {
      const saved = this.state.saved.filter(i => i !== id);
      this.setState({
        saved,
      });
      saveMasters(saved);
    } else {
      const saved = [id].concat(this.state.saved);
      this.setState({
        saved,
      });
      saveMasters(saved);
    }
  };
  render() {
    const {masters, universityMap, universities} = this.props;
    const filteredMasters = filterMasters(masters, this.state.filters, universityMap);
    const groupedAndSortedMasters = sortAndGroupMasters(filteredMasters, this.state.sort, universityMap);
    const numberOfFilters = [].concat(...Object.values(this.state.filters)).length;

    // const activeFilters = [];
    // for (const key of Object.keys(this.state.filters)) {
    //   const filterGroup = this.state.filters[key];
    //   for (const activeFilter of filterGroup) {
    //     const filter = FILTERS[key].find(d => d.value === activeFilter);
    //     activeFilters.push(filter);
    //   }
    // }

    return (
      <Layout>
        <Navbar masterCount={filteredMasters.length} saveMastersCount={this.state.saved.length} />
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
                "Der Überblick aller für Designer zugänglichen Masterstudiengänge an staatlichen Hochschulen in Deutschland."
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
          resetFilters={this.resetFilters}
          close={this.hideOverlay}
        />
        <FilterHeader id="filter-header">
          <Container>
            <FilterHeaderInner>
              <FilterButtonSection>
                <FilterText showArrow onClick={this.showOverlay}>
                  {`Filter (${numberOfFilters})`}
                </FilterText>
                <ResetFilters onClick={this.resetFilters} show={numberOfFilters > 0}>
                  {"Alle zurücksetzen"}
                </ResetFilters>
              </FilterButtonSection>
              <SortSection onClick={this.state.showSort ? this.sortHide : this.sortShow}>
                <FilterText showArrow active={true}>
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
        <Container id="masters-main">
          {groupedAndSortedMasters.map(([group, name, masters]) => {
            return (
              <React.Fragment key={group}>
                <GroupHeader>{name}</GroupHeader>
                {masters.map((master, i) => {
                  const university = universityMap[master.universityName];
                  const active = this.state.masterIds.includes(master.id);
                  const saved = this.state.saved.includes(master.id);
                  const save = () => this.save(master.id);
                  const onClick = e => {
                    e.preventDefault();
                    navigate(`/#${master.id}`, {replace: true});
                    this.toggleMaster(master.id);
                  };
                  return (
                    <Master
                      active={active}
                      saved={saved}
                      save={save}
                      onClick={onClick}
                      key={i}
                      master={master}
                      university={university}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
          {/* add one master, so that all classes from styled components are generated */}
          <div style={{display: "none"}}>
            <Master active save={() => null} onClick={() => null} master={masters[0]} university={universities[0]} />
          </div>
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
    render={data => {
      return (
        <MastersDataEnhancer data={data}>
          {(masters, universities, universityMap) => (
            <Masters masters={masters} universities={universities} universityMap={universityMap} />
          )}
        </MastersDataEnhancer>
      );
    }}
  />
);
