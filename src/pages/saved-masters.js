import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import {StaticQuery, graphql, Link} from "gatsby";
import Container from "../components/Container";
import {Masthead} from "../components/Masthead";
import {Headline} from "../components/Headline";
import Navbar from "../components/Navbar";
import {getSavedMasters, saveMasters} from "../storage";
import MastersDataEnhancer from "../components/masters/MastersDataEnhancer";
import Master from "../components/masters/Master";
import {sortAndGroupMasters} from "../components/masters/sortAndGroupMasters";
import {GroupHeader, MAIN_HEADER_HEIGHT, GroupsContainer} from "../components/masters/styles";
import {SubHeadline} from "../components/SubHeadline";
import scrollTo from "../utils/scrollTo";
import TextContainer from "../components/TextContainer";

const StyledMaster = styled(Master)`
  &:visited {
    color: black;
  }
`;

const BackToMainListContainer = styled.div`
  margin-top: 40px;
`;

class SavedMasters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      masterIds: [],
      savedMasters: getSavedMasters(),
    };
  }
  unsave(id) {
    const savedMasters = this.state.savedMasters.filter(i => i !== id);
    this.setState({
      savedMasters,
    });
    saveMasters(savedMasters);
  }
  toggleMaster = id => {
    if (this.state.masterIds.includes(id)) {
      this.setState({
        masterIds: this.state.masterIds.filter(i => i !== id),
      });
      return;
    }

    const closePreviousMasterAndQuickJump = this.state.masterIds.length > 0;

    let positionOldTop = 0;
    const element = document.getElementById(id);
    if (closePreviousMasterAndQuickJump) {
      positionOldTop = element.getBoundingClientRect().top;
    }

    this.setState(
      {
        // we only show one master at a time
        masterIds: [id],
      },
      () => {
        // we close the old master, so the whole list acts like an accordion
        if (closePreviousMasterAndQuickJump) {
          const positionNewTop = element.getBoundingClientRect().top;
          const offset = positionOldTop - positionNewTop;
          const quicklyScrollTo = window.scrollY - offset;
          window.scrollTo({behavior: "auto", left: 0, top: quicklyScrollTo});
        }
        setTimeout(() => {
          const positionTop = element.getBoundingClientRect().top;
          const top = positionTop + window.scrollY - MAIN_HEADER_HEIGHT;
          scrollTo(top);
        });
      },
    );
  };
  render() {
    const {masters, universityMap} = this.props;
    const savedMastersIds = this.state.savedMasters;
    const savedMasters = savedMastersIds
      .map(id => {
        return masters.find(m => m.id === id);
      })
      .filter(d => d);
    const groupedAndSortedMasters = sortAndGroupMasters(savedMasters, "alphabet", universityMap);
    const noMaster = savedMasters.length === 0;

    return (
      <Layout background={"white"}>
        <Navbar savedMastersCount={this.state.savedMasters.length} />
        <Masthead>
          <Container>
            <Headline>{"Merkliste"}</Headline>
            <TextContainer>
              <SubHeadline>{"Deine persönliche Übersicht aller von dir favorisierten Masterstudiengänge."}</SubHeadline>
            </TextContainer>
          </Container>
        </Masthead>
        <Container>
          {noMaster && (
            <div style={{paddingTop: 25, marginBottom: -25}}>
              <SubHeadline>{"Du hast noch keinen Studiengang auf deine Merkliste gesetzt."}</SubHeadline>
            </div>
          )}
          <GroupsContainer>
            {groupedAndSortedMasters.map(([group, name, masters]) => {
              return (
                <React.Fragment key={group}>
                  <GroupHeader>{name}</GroupHeader>
                  {masters.map((master, i) => {
                    const university = universityMap[master.universityName];
                    const active = this.state.masterIds.includes(master.id);
                    const unsave = () => this.unsave(master.id);
                    const onClick = e => {
                      e.preventDefault();
                      this.toggleMaster(master.id);
                    };
                    return (
                      <StyledMaster
                        goToMasterText={"Dieser Link öffnet den Master auf der Hauptseite."}
                        goToMaster={() => {}}
                        active={active}
                        saved
                        save={unsave}
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
            <BackToMainListContainer>
              <Link to="/">{"Zurück zur Gesamtübersicht"}</Link>
            </BackToMainListContainer>
          </GroupsContainer>
        </Container>
      </Layout>
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query SavedMastersQuery {
        masters: allMastersJson {
          ...Masters
        }
        universities: allSchoolsJson {
          ...Universities
        }
      }
    `}
    render={data => (
      <MastersDataEnhancer data={data}>
        {(masters, universities, universityMap) => (
          <SavedMasters masters={masters} universities={universities} universityMap={universityMap} />
        )}
      </MastersDataEnhancer>
    )}
  />
);
