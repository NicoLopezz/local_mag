import { FC } from "react";
import styled from "styled-components";

interface Props {
    name : string;
}

export const Task_Assigned: FC<Props> = ({ name }) => {
    return (
        <Title>
            - {name}
        </Title>
    );  
}

const Title= styled.h3`
  font-weight: 100;
  font-size: 10px;
  margin: 0;
  color: var(--dark-blue);
  font-style: italic;
`;