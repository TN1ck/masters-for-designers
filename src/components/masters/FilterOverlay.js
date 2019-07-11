import React from "react";
import styled, {css} from "styled-components";
import closeIcon from "../../img/close.svg";
import Container from "../../components/Container";
import THEME from "../../theme";
import {FILTERS, filterMasters} from "./filterMasters";
import {empty} from "../../utils/empty";
import {MAIN_HEADER_HEIGHT, FILTER_HEADER_HEIGHT} from "./styles";

export const FilterText = styled.div`
  display: block;
  position: relative;
  border-bottom: 1px solid transparent;
  font-weight: ${p => (p.active ? "bold" : "400")};
  &,
  &:visited,
  &:focus {
    color: black;
  }

  &:hover {
    cursor: pointer;
    font-weight: bold;
    letter-spacing: -0.1px;
  }

  ${p =>
    p.showArrow &&
    css`
      margin-right: 20px;
      &:after {
        transition: transform 200ms ease-out;
        position: absolute;
        content: "";
        right: ${p => p.arrowRight || -20}px;
        top: 9px;
        border-right: 6px solid transparent;
        border-top: 6px solid black;
        border-bottom: 6px solid transparent;
        border-left: 6px solid transparent;
        transform: ${p => (p.withRotation && p.active ? "rotate(180deg)" : "rotate(0deg)")};
        transform-origin: 5px 2px;
      }
    `}
`;

const FilterButtonSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  @media (max-width: 500px) {
    justify-content: space-between;
  }
`;

export const ResetFilters = styled(FilterText)`
  margin-left: 30px;
  font-size: 13px;
  line-height: 1;
  opacity: 0;
  pointer-events: none;
  ${p =>
    p.show &&
    css`
      opacity: 1;
      pointer-events: all;
    `}
  transition: opacity 0.3s;

  ${p =>
    p.hideOnMobile &&
    css`
      @media (max-width: 800px) {
        display: none;
      }
    `}
`;

const FilterMain = styled.div`
  position: fixed;
  top: ${MAIN_HEADER_HEIGHT}px;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${THEME.colors.blue};
  z-index: 99;
  overflow: scroll;
`;

const FilterButton = styled.button`
  font-family: L10;
  position: relative;
  font-weight: 400;
  font-size: 13px;
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
    color: black;
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

const FilterHeader = styled.div`
  top: 0;
  background: ${THEME.colors.blue};
  height: ${FILTER_HEADER_HEIGHT}px;
  position: sticky;
  border-bottom: 1px solid black;
  z-index: 100;
  margin-bottom: 30px;
`;

export const FilterHeaderInner = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  height: ${FILTER_HEADER_HEIGHT}px;
`;

const FilterSectionTitle = styled.div`
  flex-basis: 180px;
  flex-shrink: 0;
  font-weight: bold;
`;
const FilterSectionButtons = styled.div`
  & ${FilterButton} {
    margin-right: 10px;
    margin-bottom: 12px;
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
    ${FilterSectionButtons} {
      margin-left: -2px;
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
          <FilterHeader>
            <FilterHeaderInner>
              <FilterButtonSection>
                <FilterText arrowRight={-22} showArrow onClick={close} withRotation active={show}>
                  {`Filter (${numberOfFilters})`}
                </FilterText>
                <ResetFilters onClick={resetFilters} show={numberOfFilters > 0}>
                  {"Alle zurücksetzen"}
                </ResetFilters>
              </FilterButtonSection>
              {/* <FilterHeaderActive>{activeFilters.map(createButton)}</FilterHeaderActive> */}
            </FilterHeaderInner>
          </FilterHeader>
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
            <FilterSectionTitle>{"Disziplinen"}</FilterSectionTitle>
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
