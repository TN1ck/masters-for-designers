import React from "react";
import styled from "styled-components";
import MasterDetail from "./MasterDetail";

const MasterTitle = styled.div`
  font-size: 30px;
  width: 48%;
`;

const MasterCity = styled.div`
  margin-left: 4%;
  width: 22%;
`;

const MasterUniversity = styled.div`
  margin-left: 4%;
  width: 22%;
`;

const MasterContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 40px;
  border-top: 1px solid black;
  display: flex;

  @media (max-width: 550px) {
    flex-direction: column;

    & ${MasterCity} {
      width: 100%;
    }

    & ${MasterUniversity} {
      width: 100%;
      padding-top: 20px;
    }

    & ${MasterTitle} {
      width: 100%;
    }
  }
`;

class Master extends React.Component {
  render() {
    const {master, university} = this.props;
    return (
      <div>
        <MasterContainer>
          <MasterTitle>{master.name}</MasterTitle>
          <MasterUniversity>{master.university}</MasterUniversity>
          <MasterCity>{university.city}</MasterCity>
        </MasterContainer>
        <MasterDetail master={master} university={university} />
      </div>
    );
  }
}

export default Master;
