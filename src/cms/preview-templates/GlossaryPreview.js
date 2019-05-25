import React from "react";
import {GlossaryInner} from "../../components/glossary";

const GlossaryPreview = ({entry}) => {
  const json = entry.toJS();
  const glossary = json.data.items;
  const title = json.data.title;
  const content = json.data.content;
  return <GlossaryInner glossary={glossary} title={title} content={content} />;
};

export default GlossaryPreview;
