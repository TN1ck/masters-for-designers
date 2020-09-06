import React from "react";
import {slugify} from "../../utils/slugify";

export const enhanceUniversities = (universities, masters) => {
  const universityMap = {};
  for (const university of universities) {
    university.masters = [];
    universityMap[university.name] = university;
  }

  for (const master of masters) {
    const university = universityMap[master.universityName];
    if (!university) {
      throw new Error(`Master ${master.id} has university ${master.universityName} set, but it does not exist.`);
    }
    university.masters.push(master);
  }
  return universityMap;
};

export default class MastersDataEnhancer extends React.Component {
  constructor(props) {
    super(props);
    this.masters = this.props.data.masters.edges
      .map(n => n.node)
      .map(m => {
        const id = `master-${slugify(m.universityName)}-${slugify(m.name)}`;
        m.id = id;
        return m;
      });
    this.universities = this.props.data.universities.edges.map(n => n.node);
    this.universityMap = enhanceUniversities(this.universities, this.masters);
  }
  render() {
    return this.props.children(this.masters, this.universities, this.universityMap);
  }
}
