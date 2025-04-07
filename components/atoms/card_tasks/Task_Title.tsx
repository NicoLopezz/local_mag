import { FC } from "react";
import styled from "styled-components";

interface Props {
    title : string;
}

export const Task_Title: FC<Props> = ({ title }) => {
    return (
        <Title>
            {title}
        </Title>
    );  
}

const Title= styled.h3`
  font-weight: 600;
  font-size: 14px;
  margin: 0;
  color: var(--dark-blue);
`;