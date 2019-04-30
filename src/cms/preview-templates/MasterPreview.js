import React from "react";
import MasterDetail from "../../components/masters/MasterDetail";

const MasterPreview = ({entry}) => {
  const json = entry.toJS();
  return (
    <MasterDetail
      master={json.data}
      university={{name: json.data.university, city: "Leider hier nicht zu sehen", masters: []}}
    />
  );
};

export default MasterPreview;
