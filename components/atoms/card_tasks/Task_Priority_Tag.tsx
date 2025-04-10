import { FC } from "react";
import styled from "styled-components";

interface Props {
    priority : string;
}

export const Task_Priority_Tag: FC<Props> = ({ priority }) => {
    return (
        <Title>
            {priority}
        </Title>
    );  
}

const Title= styled.h3`
  font-weight: 100;
  font-size: 12px;
  margin: 0;
  color: var(--dark-blue);
`;