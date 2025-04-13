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
  margin-top:-5px;  
  color: var(--dark-blue);
  line-height: 1.2;
  max-height: 2.4em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

`;