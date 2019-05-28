import React from "react";
import Layout from "../components/Layout";
import {StaticQuery, graphql} from "gatsby";
import Container from "../components/Container";
import {Masthead} from "../components/Masthead";
import {Headline} from "../components/Headline";
import Navbar from "../components/Navbar";
import {getSavedMasters} from "../storage";
import MastersDataEnhancer from "../components/masters/MastersDataEnhancer";
import Master from "../components/masters/Master";
import {sortAndGroupMasters} from "../components/masters/sortAndGroupMasters";
import {GroupHeader, MAIN_HEADER_HEIGHT, FILTER_HEADER_HEIGHT} from "../components/masters/styles";
import {SubHeadline} from "../components/SubHeadline";

class SavedMasters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      masterId: "",
      savedMasters: getSavedMasters(),
    };
  }
  unsave(id) {
    this.setState({
      savedMasters: this.state.savedMasters.filter(i => i !== id),
    });
  }
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
          const quicklyScrollTo = window.scrollY - offset;
          window.scrollTo({behavior: "auto", left: 0, top: quicklyScrollTo});
        }
        setTimeout(() => {
          const position = element.getBoundingClientRect();
          const top = position.top + window.scrollY - MAIN_HEADER_HEIGHT;
          window.scrollTo({left: 0, top: top, behavior: "smooth"});
        });
      },
    );
  };
  render() {
    const {masters, universities, universityMap} = this.props;
    const savedMastersIds = this.state.savedMasters;
    const savedMasters = savedMastersIds.map(id => {
      return masters.find(m => m.id === id);
    });
    const groupedAndSortedMasters = sortAndGroupMasters(savedMasters, "alphabet", universityMap);

    return (
      <Layout background={"white"}>
        <Navbar />
        <Masthead>
          <Container>
            <Headline>{"Merkliste"}</Headline>
            <SubHeadline>
              {"Die Platform für Designer, um einen individuell passenden Masterstudiengang zu finden."}
            </SubHeadline>
          </Container>
        </Masthead>
        <Container>
          {groupedAndSortedMasters.map(([group, name, masters]) => {
            return (
              <React.Fragment key={group}>
                <GroupHeader>{name}</GroupHeader>
                {masters.map((master, i) => {
                  const university = universityMap[master.universityName];
                  const active = this.state.masterId === master.id;
                  const unsave = () => this.unsave(master.id);
                  const onClick = e => {
                    e.preventDefault();
                    this.toggleMaster(master.id);
                  };
                  return (
                    <Master
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
