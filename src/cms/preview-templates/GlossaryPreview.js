import React from "react";
import {Glossary} from "../../pages/glossary";

const GlossaryPreview = ({entry}) => {
  const json = entry.toJS();
  console.log(json);
  return <div>{"test"}</div>;
};

export default GlossaryPreview;
