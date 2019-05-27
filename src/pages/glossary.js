import React from "react";
import {StaticQuery, graphql} from "gatsby";
import Glossary from "../components/glossary";

export default () => (
  <StaticQuery
    query={graphql`
      query GlossaryQuery {
        glossary: allGlossaryJson {
          edges {
            node {
              title
              content
              items {
                title
                content
                sections {
                  subtitle
                  content
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Glossary data={data} />}
  />
);
