import styled from "styled-components";
import THEME from "../../theme";

// need to be changed when style changes
export const MAIN_HEADER_HEIGHT = 43;
export const FILTER_HEADER_HEIGHT = 43;

export const GroupHeader = styled.h3`
  color: ${THEME.colors.blue};
  /* top: 83px; */
  /* position: sticky; */
  margin: 0;
  margin-top: 70px;
  background: white;
  padding: 10px 0;
  border-bottom: 1px solid black;
`;