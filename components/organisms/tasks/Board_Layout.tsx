import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 1500px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  height: 70vh;
  scrollbar-width: auto;
  -webkit-overflow-scrolling: touch;
`;

export const Board = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: fit-content;
  align-items: flex-start;
`;
