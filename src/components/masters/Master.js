import React from "react";
import styled, {css} from "styled-components";
import MasterDetail from "./MasterDetail";
import {masterTranslation} from "./translations";
import THEME from "../../theme";
import {formatDate} from "../../utils/formatDate";
import {SaveIcon} from "../Icons";

const MasterTitle = styled.div`
  font-size: 24px;
  word-break: break-word;
  position: relative;
  width: 50%;
  padding-right: 30px;
`;

const MasterNonTitleContainer = styled.div`
  width: 50%;
  padding-left: 20px;
  padding-right: 30px;
  display: flex;
  justify-content: space-between;
`;

const MasterCity = styled.div`
  width: 30%;
  padding-right: 10%;
`;

const MasterDeadline = styled.div`
  width: 20%;
`;

const MasterUniversity = styled.div`
  padding-right: 10%;
  width: 50%;
`;
const MasterDetailContainer = styled.div`
  padding-bottom: 10px;
`;

const MasterDetailDegree = styled.div`
  /* top: -12px;
  width: 50px;
  position: absolute; */
  display: inline-block;
  text-transform: uppercase;
  font-style: italic;
  opacity: ${p => (p.show ? 1 : 0)};
  transition: opacity 0.3s;
  overflow: visible;
`;

const MasterSave = styled.div`
  position: absolute;
  right: 0;
  top: 17px;
  display: ${p => (p.saved || p.active ? "block" : "none")};
  @media not all and (hover: none) {
    &:hover {
      cursor: pointer;
      display: block;
      transform: scale(1.2);
    }
  }
  @media (hover: none) {
    display: block;
  }
  transition: transform 0.2s;
`;

const makeBold = css`
  ${MasterTitle} {
    font-weight: bold;
    letter-spacing: -0.17px;
  }

  ${MasterCity} {
    font-weight: bold;
    letter-spacing: -0.1px;
  }

  ${MasterUniversity} {
    font-weight: bold;
    letter-spacing: -0.1px;
  }

  ${MasterDeadline} {
    font-weight: bold;
    letter-spacing: -0.1px;
  }

  ${MasterSave} {
    display: block;
  }
`;

const MasterContainer = styled.a`
  display: block;
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid black;
  border-bottom: none !important;
  display: flex;
  position: relative;

  &:focus {
    outline: none;
  }

  @media (max-width: 800px) {
    flex-direction: column;

    & ${MasterNonTitleContainer} {
      display: block;
      padding: 0;
      width: 100%;
    }

    & ${MasterCity} {
      padding-right: 0;
      width: 100%;
      display: none;
    }

    & ${MasterUniversity} {
      width: 100%;
      padding-right: 0;
      padding-top: 5px;
    }

    & ${MasterTitle} {
      width: 100%;
      padding-right: 34px;
    }

    & ${MasterDeadline} {
      width: 100%;
    }

    ${MasterSave} {
      top: 25px;
    }
  }

  /* transition: color 0.3s; */

  &:visited {
    color: ${p => (p.active ? "black" : THEME.colors.orange)};
  }

  ${p => p.active && makeBold}

  @media not all and (hover: none) {
    &:hover {
      ${makeBold}
    }
  }
`;

const MasterTitleText = styled.span`
  padding-right: 5px;
`;

class Master extends React.Component {
  save = e => {
    e.stopPropagation();
    e.preventDefault();
    this.props.save();
  };
  shouldComponentUpdate(props) {
    return props.previewMode || props.saved !== this.props.saved || props.active !== this.props.active;
  }
  render() {
    const {master, university, save, isLast, saved, active, className, goToMaster, goToMasterText} = this.props;
    let title = master.name.normalize();
    // When there is something in parentheses in the title, we always make a line-break
    if (title.includes("(")) {
      const [title1, title2] = title.split("(");
      title = (
        <React.Fragment>
          {title1}
          <br />
          {" ("}
          {title2}
        </React.Fragment>
      );
    }
    return (
      <div style={{borderBottom: active && !isLast ? "1px solid black" : "1px solid transparent"}}>
        <MasterContainer
          className={className}
          id={master.id}
          onClick={this.props.onClick}
          href={`/#${master.id}`}
          active={this.props.active}
        >
          <MasterTitle>
            <MasterTitleText>{title}</MasterTitleText>
            <MasterDetailDegree show={this.props.active}>
              {" (" + masterTranslation[master.direction.degree] + ")"}
            </MasterDetailDegree>
          </MasterTitle>
          <MasterNonTitleContainer>
            <MasterUniversity>{master.universityName.normalize()}</MasterUniversity>
            <MasterCity>{university.city.normalize()}</MasterCity>
            <MasterDeadline>
              {master.timeAndMoney.applicationDeadlines.map(d => formatDate(d.date)).join(" & ")}
            </MasterDeadline>
          </MasterNonTitleContainer>
          <MasterSave saved={saved} onClick={this.save} active={active}>
            <SaveIcon fill={saved ? THEME.colors.orange : "black"} />
          </MasterSave>
        </MasterContainer>
        <MasterDetailContainer>
          {this.props.active && (
            <MasterDetail
              goToMasterText={goToMasterText}
              goToMaster={goToMaster}
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
