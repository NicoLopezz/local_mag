import { FC } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  logo: string;
  alt: string;
  empresa: string;
}

export const Sidebar_Item_Logo: FC<Props> = ({ logo, alt, empresa }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/empresa/${empresa}`);
  };

  return (
    <Logo_Container onClick={handleClick}>
      <Image src={logo} alt={alt} width={48} height={48} />
    </Logo_Container>
  );
};

const Logo_Container = styled.div`
  height: 6rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
