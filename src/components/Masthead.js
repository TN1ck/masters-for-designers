import styled from "styled-components";
import THEME from "../theme";
export const Masthead = styled.header`
  background-color: ${p => p.background || THEME.colors.orange};
  padding-bottom: 20px;
`;
