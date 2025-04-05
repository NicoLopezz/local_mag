import { FC } from "react";
import styled from "styled-components";
import { SearchInput } from "../../molecules/navbar/Search_Input";
import { NotificationBell } from "../../molecules/navbar/Notification_Bell";
import { UserProfile } from "../../molecules/navbar/User_Profile";

interface Props {
  userName: string;
  userImage: string;
}

export const Navbar: FC<Props> = ({ userName, userImage }) => {
  return (
    <Navbar_Wrapper>
      <Navbar_Container>
        <Left_Section>
          <span>Distribuidora RRL</span>
        </Left_Section>
        <Center_Section>
          <SearchInput />
        </Center_Section>
        <Right_Section>
          <NotificationBell />
          <UserProfile name={userName} imageUrl={userImage} />
        </Right_Section>
      </Navbar_Container>
    </Navbar_Wrapper>
  );
};


const Navbar_Wrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid #ddd;
  z-index: 1000;
`;

const Navbar_Container = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  box-sizing: border-box;
  position: relative;
`;

const Left_Section = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3.5rem;
  font-size: 1.5rem;
  font-weight: 400;
`;

const Center_Section = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const Right_Section = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
`;