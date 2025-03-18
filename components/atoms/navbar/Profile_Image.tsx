import { FC } from "react";
import styled from "styled-components";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

const ProfileWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

export const ProfileImage: FC<Props> = ({ src, alt }) => {
  return (
    <ProfileWrapper>
      <Image src={src} alt={alt} width={40} height={40} />
    </ProfileWrapper>
  );
};
