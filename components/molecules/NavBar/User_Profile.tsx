import { FC } from "react";
import styled from "styled-components";
import { UserName } from "../../atoms/NavBar/User_Name";
import { ProfileImage } from "../../atoms/NavBar/Profile_Image";

interface Props {
  name: string;
  imageUrl: string;
}

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const UserProfile: FC<Props> = ({ name, imageUrl }) => {
  return (
    <ProfileWrapper>
      <UserName name={name} />
      <ProfileImage src={imageUrl} alt={name} />
    </ProfileWrapper>
  );
};
