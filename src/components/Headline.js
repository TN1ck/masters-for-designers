import styled from "styled-components";
export const Headline = styled.h1`
  font-size: 54px;
  font-weight: 400;
  color: black;
  padding-top: 140px;
  padding-bottom: 0;
  text-transform: uppercase;
  letter-spacing: 3.2px;
  line-height: 30px;
  margin: 0;

  @media (max-width: 800px) {
    font-size: 40px;
    letter-spacings: 2px;
    line-height: 1.1;
    padding-top: 120px;
  }
`;
