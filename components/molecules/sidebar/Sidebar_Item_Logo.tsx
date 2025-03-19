import { FC } from "react";
import styled from "styled-components";

interface Props {
  logo: string;
  alt: string;
}

const Logo_Wrapper = styled.div`
  width: 99%;
  height: 80px; /* Ajusta el tamaño del logo */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  border-bottom: 1px solid #ddd;
`;

const Logo_Image = styled.img`
  max-width: 60%;
  max-height: 80%;
`;

export const Sidebar_Item_Logo: FC<Props> = ({ logo, alt }) => {
  return (
    <Logo_Wrapper>
      <Logo_Image src={logo} alt={alt} />
    </Logo_Wrapper>
  );
};
