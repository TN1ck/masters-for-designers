import React from "react";
import styled from "styled-components";
import MasterDetail from "./MasterDetail";
import {slugify} from "../../utils/slugify";

const MasterTitle = styled.div`
  font-size: 30px;
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
  padding-bottom: 40px;
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
    background: #eaeaea;
  }
`;

class Master extends React.Component {
  state = {
    open: false,
  };
  toggle = id => {
    const element = document.getElementById(id);
    const position = element.getBoundingClientRect();
    const top = position.top + window.scrollY - 120;
    window.scrollTo(0, top);
    this.setState({
      open: !this.state.open,
    });
  };
  render() {
    const {master, university} = this.props;
    const id = `master-${slugify(master.university)}-${slugify(master.name)}`;
    return (
      <div>
        <MasterContainer id={id} onClick={() => this.toggle(id)}>
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
