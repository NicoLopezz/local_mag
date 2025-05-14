import { FC } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router"; 

interface Props {
  src: string;
  userProfile: string; 
}

const ProfileWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer; 
`;

export const ProfileImage: FC<Props> = ({ src, userProfile }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/user/${userProfile}`); 
  };

  return (
    <ProfileWrapper onClick={handleClick}>
      <Image src={src} alt="User Profile" width={40} height={40} />
    </ProfileWrapper>
  );
};
