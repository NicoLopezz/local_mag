import { FC } from "react";
import styled from "styled-components";
import { SearchInput } from "../../molecules/navbar/Search_Input";
import { NotificationBell } from "../../molecules/navbar/Notification_Bell";
import { UserProfile } from "../../molecules/navbar/User_Profile";

interface Props {
  userName: string;
  userImage: string;
}

const NavbarContainer = styled.nav`
  width: 100%;
  position: fixed;
  margin-left:5%;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  height:3rem;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  /* gap: 20px; */
  padding-left: 3rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding-right: 10rem;
`;

export const Navbar: FC<Props> = ({ userName, userImage }) => {
  return (
    <NavbarContainer>
      <LeftSection>
        <span>Nombre del local ▼</span>
      </LeftSection>
      <RightSection>
        <SearchInput />
        <NotificationBell />
        <UserProfile name={userName} imageUrl={userImage} />
      </RightSection>
    </NavbarContainer>
  );
};
