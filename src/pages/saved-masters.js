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

const SavedMasters = ({masters, universities, universityMap}) => {
  const savedMastersIds = getSavedMasters();
  const savedMasters = savedMastersIds.map(id => {
    return masters.find(m => m.id === id);
  });

  return (
    <Layout background={"white"}>
      <Navbar />
      <Masthead>
        <Container>
          <Headline>{"Merkliste"}</Headline>
        </Container>
      </Masthead>
      <Container>
        {savedMasters.map((master, i) => {
          const university = universityMap[master.universityName];
          const active = false;
          const saved = true;
          const save = () => this.save(master.id);
          return (
            <Master
              onClick={() => null}
              active={active}
              saved={saved}
              save={save}
              key={i}
              master={master}
              university={university}
            />
          );
        })}
      </Container>
    </Layout>
  );
};

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
