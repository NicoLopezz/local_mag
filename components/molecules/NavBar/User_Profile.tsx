import { FC } from "react";
import styled from "styled-components";
import { UserName } from "../../atoms/navbar/User_Name";
import { ProfileImage } from "../../atoms/navbar/Profile_Image";

interface Props {
  name: string;
  imageUrl: string;
}

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const UserProfile: FC<Props> = ({ name, imageUrl }) => {
  return (
    <ProfileWrapper>
      <UserName name={name} />
      <ProfileImage src="" userProfile="Nicolas" />
      </ProfileWrapper>
  );
};
