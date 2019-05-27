import React from "react";
import {navigate} from "gatsby";
import styled, {css} from "styled-components";
import MasterDetail from "./MasterDetail";
import {masterTranslation} from "./translations";
import iconClose from "../../img/close.svg";
import THEME from "../../theme";
import {formatDate} from "../../utils/formatDate";
import {SaveIcon} from "../Icons";

const MasterTitle = styled.div`
  font-size: 24px;
  width: 50%;
  font-weight: ${p => (p.bold ? "bold" : "normal")};
  word-break: break-word;
  position: relative;
`;

const MasterCity = styled.div`
  margin-left: 4%;
  width: 10%;
`;

const MasterDeadline = styled.div`
  margin-left: 4%;
  width: 9%;
`;

const MasterDetailContainer = styled.div``;

const MasterUniversity = styled.div`
  margin-left: 4%;
  width: 22%;
`;

const MasterDetailSmall = styled.small`
  display: block;
  font-size: 12px;
`;

const MasterDetailDegree = styled(MasterDetailSmall)`
  top: -12px;
  position: absolute;
  text-transform: uppercase;
  font-style: italic;
  opacity: ${p => (p.show ? 1 : 0)};
  transition: opacity 0.3s;
`;

const MasterSave = styled.div`
  position: absolute;
  right: 0;
  top: 17px;
  display: ${p => (p.saved || p.active ? "block" : "none")};
  &:hover {
    cursor: pointer;
    display: block;
    & .save-fill {
      fill: ${THEME.colors.orange};
    }
  }
`;

const MasterClose = styled.button`
  position: absolute;
  right: 0;
  top: 17px;
  border: none;
  background: none;
  line-height: 1;
  width: 30px;
  height: 30px;
  opacity: 0;
  pointer-events: none;
  ${p =>
    p.show &&
    css`
      opacity: 1;
      pointer-events: all;
    `}
  transition: opacity 0.3s;
  border-radius: 50%;

  &:hover,
  &:focus {
    outline: none;
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const MasterContainer = styled.a`
  display: block;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 60px;
  border-top: 1px solid black;
  border-bottom: none !important;
  display: flex;
  position: relative;

  @media (max-width: 550px) {
    flex-direction: column;

    & ${MasterCity} {
      margin-left: 0;
      width: 100%;
      display: none;
    }

    & ${MasterUniversity} {
      width: 100%;
      margin-left: 0;
      padding-top: 5px;
    }

    & ${MasterTitle} {
      width: 100%;
    }

    & ${MasterDeadline} {
      margin-left: 0;
      width: 100%;
    }
  }

  /* transition: color 0.3s; */

  &:visited {
    color: ${p => (p.active ? "black" : THEME.colors.orange)};
  }

  &:hover {
    cursor: pointer;
    ${MasterTitle} {
      font-weight: bold;
    }

    ${MasterSave} {
      display: block;
    }
  }
`;

class Master extends React.Component {
  onClick = e => {
    e.preventDefault();
    const scrollPosition = window.scrollY;
    navigate(`/#${this.props.master.id}`, {replace: true});
    this.props.onClick();
  };
  save = e => {
    e.stopPropagation();
    e.preventDefault();
    this.props.save();
  };
  render() {
    const {master, university, save, saved, active} = this.props;
    let title = master.name;
    // When there is something in parentheses in the title, we always make a line-break
    if (title.includes("(")) {
      const [title1, title2] = title.split("(");
      title = (
        <React.Fragment>
          {title1}
          <br />
          {"("}
          {title2}
        </React.Fragment>
      );
    }
    return (
      <div>
        <MasterContainer id={master.id} onClick={this.onClick} href={`/#${master.id}`} active={this.props.active}>
          <MasterTitle bold={this.props.active}>
            <MasterDetailDegree show={this.props.active}>
              {masterTranslation[master.direction.degree]}
            </MasterDetailDegree>
            {title}
          </MasterTitle>
          <MasterUniversity>{master.universityName}</MasterUniversity>
          <MasterCity>{university.city}</MasterCity>
          <MasterDeadline>
            {master.timeAndMoney.applicationDeadlines.map(d => formatDate(d.date)).join(" & ")}
          </MasterDeadline>
          <MasterSave saved={saved} onClick={this.save} active={active}>
            <SaveIcon fill={saved ? THEME.colors.orange : "black"} />
          </MasterSave>
          {/* <MasterClose show={active}>
            <img src={iconClose} alt="close" />
          </MasterClose> */}
        </MasterContainer>
        <MasterDetailContainer>
          {this.props.active && (
            <MasterDetail
              saved={saved}
              save={save}
              master={master}
              university={university}
              close={this.props.onClick}
            />
          )}
        </MasterDetailContainer>
      </div>
    );
  }
}

export default Master;
