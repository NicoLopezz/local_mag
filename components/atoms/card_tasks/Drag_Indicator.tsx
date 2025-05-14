import { FC } from "react";
import styled from "styled-components";

interface Props {}

export const Drag_Indicator: FC<Props> = () => {
  return <Drag_Handle />;
};

const Drag_Handle = styled.div`
  width: 20px;
  height: 4px;
  background-color: var(--grey);
  border-radius: 4px;
  margin-bottom: 8px;
  align-self: flex-start;
`;