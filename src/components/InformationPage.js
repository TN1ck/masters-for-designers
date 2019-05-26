import styled from "styled-components";
import THEME from "../theme";

export const Container = styled.div`
  padding-bottom: 80px;
  word-break: break-word;

  & p {
    padding: 0;
  }

  h3 {
    margin-top: 40px;
    margin-bottom: 0;
    font-size: 30px;
    letter-spacing: 0.02em;
  }

  h5 {
    margin-top: 40px;
    margin-bottom: 0;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
`;

export const ColumnHalf = styled.div`
  width: 50%;
  padding: 0 20px;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const ColumnFull = styled.div`
  width: 100%;
  padding: 0 20px;
`;
