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

  &:hover {
    cursor: pointer;
    background: #eaeaea;
  }
`;

class Master extends React.Component {
  state = {
    open: false,
  };
  toggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  render() {
    const {master, university} = this.props;
    return (
      <div>
        <MasterContainer onClick={this.toggle}>
          <MasterTitle>{master.name}</MasterTitle>
          <MasterUniversity>{master.university}</MasterUniversity>
          <MasterCity>{university.city}</MasterCity>
        </MasterContainer>
        {this.state.open && <MasterDetail master={master} university={university} />}
      </div>
    );
  }
}

export default Master;
