import React from "react";
import styled from "styled-components";

const MasterContainer = styled.div`
  padding: 0 10px;
  border-top: 1px solid black;
`;

const MasterTitle = styled.div`
  font-family: 24px;
`;

const MasterCity = styled.div``;

const MasterUniversity = styled.div``;

class Master extends React.Component {
  render() {
    const {master} = this.props;
    return (
      <MasterContainer>
        <MasterTitle>{master.name}</MasterTitle>
        <MasterUniversity>{master.university}</MasterUniversity>
        <MasterCity>{master.city}</MasterCity>
      </MasterContainer>
    );
  }
}

export default Master;
