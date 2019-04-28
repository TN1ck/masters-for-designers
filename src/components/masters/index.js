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
  background-color: rgba(255, 255, 255, 0);
  transition: background-color 300ms ease-out;
  border: 1px solid black;
  padding: 10px 20px;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.3);
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

class Masters extends React.Component {
  state = {
    show: false,
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

    return (
      <Layout>
        <Masthead>
          <Container>
            <Navbar universityCount={universities.length} masterCount={masters.length} />
            <Headline>
              <i>M</i>
              {"asters for"}
              <br />
              <i>D</i>esigners
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
                <FilterButton onClick={this.toggleShow}>{"show all"}</FilterButton>
              </FilterButtonSection>
              <SortSection>
                <SortText>{"Sortieren: "}</SortText>
                {"Studiengang"}
              </SortSection>
            </FilterHeader>
            <FilterSection>
              <FilterSectionTitle>{"Hochschule"}</FilterSectionTitle>
              <FilterSectionButtons>
                <FilterButton>{"Universität"}</FilterButton>
                <FilterButton>{"Kunsthochschule"}</FilterButton>
                <FilterButton>{"Fachhochschule"}</FilterButton>
              </FilterSectionButtons>
            </FilterSection>
            <FilterSection>
              <FilterSectionTitle>{"Mastertyp"}</FilterSectionTitle>
              <FilterSectionButtons>
                <FilterButton>{"Konsektutiv"}</FilterButton>
                <FilterButton>{"Nicht konsekutiv"}</FilterButton>
                <FilterButton>{"Weiterbildend"}</FilterButton>
              </FilterSectionButtons>
            </FilterSection>
            <FilterSection>
              <FilterSectionTitle>{"Ausrichtung"}</FilterSectionTitle>
              <FilterSectionButtons>
                <FilterButton>{"praktisch"}</FilterButton>
                <FilterButton>{"theoretisch"}</FilterButton>
                <FilterButton>{"thematisch"}</FilterButton>
              </FilterSectionButtons>
            </FilterSection>
            <FilterSection>
              <FilterSectionTitle>{"Inhaltlicher Fokus"}</FilterSectionTitle>
              <FilterSectionButtons>
                <FilterButton>{"Fachspezifisch"}</FilterButton>
                <FilterButton>{"Fachübergreifend"}</FilterButton>
                <FilterButton>{"Thematisch"}</FilterButton>
              </FilterSectionButtons>
            </FilterSection>
            <FilterSection>
              <FilterSectionTitle>{"Disziplinäre Zusammensetzung"}</FilterSectionTitle>
              <FilterSectionButtons>
                <FilterButton>{"Disziplinär"}</FilterButton>
                <FilterButton>{"Interdisziplinär gestalterisch"}</FilterButton>
                <FilterButton>{"Gestalterisch & Nicht gestalterisch"}</FilterButton>
                <FilterButton>{"Digitale Medien"}</FilterButton>
                <FilterButton>{"Fotografie/Film"}</FilterButton>
                <FilterButton>{"Illustration"}</FilterButton>
                <FilterButton>{"Mode/Textil"}</FilterButton>
                <FilterButton>{"Produkt/Industrie"}</FilterButton>
                <FilterButton>{"Raum"}</FilterButton>
                <FilterButton>{"Schmuck"}</FilterButton>
                <FilterButton>{"Visuelle Kommunikation"}</FilterButton>
              </FilterSectionButtons>
            </FilterSection>
            <FilterSection>
              <FilterSectionTitle>{"Studienform"}</FilterSectionTitle>
              <FilterSectionButtons>
                <FilterButton>{"Vollzeit"}</FilterButton>
                <FilterButton>{"Teilzeit"}</FilterButton>
                <FilterButton>{"Berufsbegleitend"}</FilterButton>
                <FilterButton>{"Fernstudium"}</FilterButton>
              </FilterSectionButtons>
            </FilterSection>
            <FilterSection>
              <FilterSectionTitle>{"Zulassungssemester"}</FilterSectionTitle>
              <FilterSectionButtons>
                <FilterButton>{"Sommersemester"}</FilterButton>
                <FilterButton>{"Wintersemester"}</FilterButton>
              </FilterSectionButtons>
            </FilterSection>
            <FilterSection>
              <FilterSectionTitle>{"Internationailtät"}</FilterSectionTitle>
              <FilterSectionButtons>
                <FilterButton>{"Englischsprachig"}</FilterButton>
                <FilterButton>{"Intergriertes Auslandssemster"}</FilterButton>
                <FilterButton>{"Doppelter Abschluss"}</FilterButton>
              </FilterSectionButtons>
            </FilterSection>
          </Container>
        </FilterContainer>
        {masters.map((master, i) => {
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
