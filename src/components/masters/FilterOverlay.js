import React from "react";
import styled, {css} from "styled-components";
import closeIcon from "../../img/close.svg";
import Container from "../../components/Container";
import THEME from "../../theme";
import {FILTERS, filterMasters} from "./filterMasters";
import {empty} from "../../utils/empty";

const ResetFilters = styled.div`
  opacity: 0;
  pointer-events: none;
  ${p =>
    p.show &&
    css`
      opacity: 1;
      pointer-events: all;
    `}
  transition: opacity 0.3s;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const FilterMain = styled.div`
  position: fixed;
  top: 43px;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${THEME.colors.blue};
  z-index: 99;
  overflow: scroll;
`;

const FilterButton = styled.button`
  position: relative;
  font-weight: 400;
  font-size: 12px;
  background-color: ${p => (p.active ? "rgba(255, 255, 255, 1)" : " rgba(255, 255, 255, 0)")};
  transition: background-color 100ms ease-out;
  border-radius: 20px;
  border: 1px solid black;
  padding: 5px 15px;

  & img {
    position: absolute;
    right: 10px;
    top: 8px;
    width: 10px;
    height: 10px;
  }

  &:focus {
    outline: none;
    background-color: ${p => (p.active ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.3)")};
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
    pointer-events: none;
  }

  @media not all and (hover: none) {
    &:hover {
      cursor: pointer;
      background-color: ${p => (p.active ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.3)")};
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0px;
  top: 10px;
  background: none;
  border: none;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  padding: 0;
  line-height: 1;
  outline: none;
`;

const FilterHeader = styled.div`
  top: 0;
  background: ${THEME.colors.blue};
  position: sticky;
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid black;
  z-index: 100;

  @media not all and (hover: none) {
    &:hover,
    &:focus {
      cursor: pointer;
      ${CloseButton} {
        outline: none;
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
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

const FilterSection = styled.div`
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    ${FilterSectionTitle} {
      padding-bottom: 10px;
      flex-basis: 0;
    }
  }
`;

export const FilterButtonMore = ({
  type,
  value,
  name,
  filter,
  filters,
  universityMap,
  masters,
  filteredMasters,
  toggleFilter,
}) => {
  const active = filters[type].includes(value);
  const isEmpty = empty(filters[type]);
  // when it is not empty, we can find out how mich will be added when clicking the button
  // for this we clone the current filters and add ourselves to it
  const filtersWithCurrent = {
    ...filters,
    [type]: [value].concat(filters[type]),
  };

  let count = 0;
  if (isEmpty || !active) {
    count = isEmpty
      ? filteredMasters.filter(m => filter(m, universityMap[m.universityName])).length
      : filterMasters(masters, filtersWithCurrent, universityMap).length - filteredMasters.length;
  }

  const disable = count === 0 && !active;

  const toggle = e => {
    e.preventDefault();
    toggleFilter(type, value);
  };

  return (
    <FilterButton
      disabled={disable}
      style={{paddingRight: 50}}
      active={active}
      key={value}
      onClick={disable ? () => {} : toggle}
    >
      {name}{" "}
      {!active && (
        <span style={{position: "absolute", right: 45, top: 4, transform: "translate(100%)"}}>
          {isEmpty ? `(${count})` : `(+${count})`}
        </span>
      )}
      {active && <img src={closeIcon} alt="close" />}
    </FilterButton>
  );
};

export default class FilterOverlay extends React.Component {
  render() {
    const {filters, show, filteredMasters, universityMap, masters, close, toggleFilter, resetFilters} = this.props;

    const numberOfFilters = [].concat(...Object.values(filters)).length;

    const createButton = ({type, value, name, filter}) => {
      return (
        <FilterButtonMore
          key={value}
          type={type}
          value={value}
          name={name}
          filter={filter}
          filters={filters}
          universityMap={universityMap}
          masters={masters}
          filteredMasters={filteredMasters}
          toggleFilter={toggleFilter}
        />
      );
    };

    return (
      <FilterMain id="filter-main" style={{display: show ? "block" : "none"}}>
        <Container>
          <FilterHeader onClick={close}>
            {`Filter (${numberOfFilters})`}
            {/* <FilterHeaderActive>{activeFilters.map(createButton)}</FilterHeaderActive> */}
            <CloseButton>
              <img src={closeIcon} alt="close filters" />
            </CloseButton>
          </FilterHeader>
          <ResetFilters onClick={resetFilters} show={numberOfFilters > 0}>
            {"Alle zurücksetzen"}
          </ResetFilters>
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
            <FilterSectionButtons>{FILTERS.functionalComposition.map(createButton)}</FilterSectionButtons>
          </FilterSection>
          <FilterSection>
            <FilterSectionTitle>{"Zugelassenene Disziplinen"}</FilterSectionTitle>
            <FilterSectionButtons>{FILTERS.allowedDisciplinesTag.map(createButton)}</FilterSectionButtons>
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
            <FilterSectionTitle>{"Internationalität"}</FilterSectionTitle>
            <FilterSectionButtons>
              {FILTERS.internationalityEnglish
                .map(createButton)
                .concat(FILTERS.internationalitySemesterAbroad.map(createButton))
                .concat(FILTERS.internationalityDoubleDegree.map(createButton))}
            </FilterSectionButtons>
          </FilterSection>
        </Container>
      </FilterMain>
    );
  }
}
