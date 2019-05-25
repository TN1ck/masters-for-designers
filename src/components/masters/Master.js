import React from "react";
import styled from "styled-components";
import MasterDetail from "./MasterDetail";

const MasterTitle = styled.div`
  font-size: 24px;
  width: 48%;
  word-break: break-word;
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
  display: block;
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid black;
  display: flex;

  @media (max-width: 550px) {
    flex-direction: column;

    & ${MasterCity} {
      margin-left: 0;
      width: 100%;
    }

    & ${MasterUniversity} {
      width: 100%;
      margin-left: 0;
      padding-top: 20px;
    }

    & ${MasterTitle} {
      width: 100%;
    }
  }

  &:hover {
    cursor: pointer;
    ${MasterTitle} {
      font-style: italic;
    }
  }
`;

class Master extends React.Component {
  render() {
    const {master, university} = this.props;
    return (
      <div>
        <MasterContainer id={master.id} onClick={this.props.onClick}>
          <MasterTitle>{master.name}</MasterTitle>
          <MasterUniversity>{master.universityName}</MasterUniversity>
          <MasterCity>{university.city}</MasterCity>
        </MasterContainer>
        {this.props.active && <MasterDetail master={master} university={university} />}
      </div>
    );
  }
}

export default Master;
