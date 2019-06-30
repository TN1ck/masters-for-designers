import React from "react";
import Master from "../../components/masters/Master";

const MasterPreview = ({entry}) => {
  const json = entry.toJS();
  return (
    <Master
      previewMode
      master={json.data}
      university={{name: json.data.university, city: "Leider hier nicht zu sehen", masters: []}}
      goToMasterText={"Master direkt anschauen."}
      goToMaster={() => {}}
      active
      saved={false}
      save={() => null}
      onClick={() => null}
    />
  );
};

export default MasterPreview;
