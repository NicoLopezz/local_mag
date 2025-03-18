import { FC } from "react";
import styled from "styled-components";
import { SearchInput } from "../../molecules/NavBar/Search_Input";
import { NotificationBell } from "../../molecules/NavBar/Notification_Bell";
import { UserProfile } from "../../molecules/NavBar/User_Profile";

interface Props {
  userName: string;
  userImage: string;
}

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Navbar: FC<Props> = ({ userName, userImage }) => {
  return (
    <NavbarContainer>
      <LeftSection>
        <span>Nombre del local ▼</span>
        <SearchInput />
      </LeftSection>
      <RightSection>
        <NotificationBell />
        <UserProfile name={userName} imageUrl={userImage} />
      </RightSection>
    </NavbarContainer>
  );
};
