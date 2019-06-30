import styled from "styled-components";
import THEME from "../../theme";

// need to be changed when style changes
export const MAIN_HEADER_HEIGHT = 55;
export const FILTER_HEADER_HEIGHT = 55;

export const GroupHeader = styled.h3`
  color: ${THEME.colors.blue};
  /* top: 83px; */
  /* position: sticky; */
  margin: 0;
  margin-top: 70px;
  background: white;
  padding: 10px 0;
  border-bottom: 1px solid black;
  font-size: 24px;
  font-weight: normal;
`;

export const GroupsContainer = styled.div`
  width: 100%;
  margin-bottom: 80px;
`;
