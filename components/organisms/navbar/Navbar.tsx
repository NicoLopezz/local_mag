import { FC } from "react";
import styled from "styled-components";
import { useState } from "react";

import { SearchInput } from "../../molecules/NavBar/Search_Input";
import { NotificationBell } from "../../molecules/NavBar/Notification_Bell";
import { UserProfile } from "../../molecules/NavBar/User_Profile";
import { Cobrar_Detail } from "../../organisms/cobrar_modals/Cobrar_Detail";
import { Stock_Detail } from "../../organisms/stock_modals/Stock_Detail";
import {Dollar_Icon} from "@/components/atoms/icons/Dollar_Icon"

interface Props {
  userName: string;
  userImage: string;
}

export const Navbar: FC<Props> = ({ userName, userImage }) => {
  const [pedidoModalOpen, setPedidoModalOpen] = useState(false);
  const [stockModalOpen, setStockModalOpen] = useState(false);

  
  const handleOpenCobrarModal = () => setPedidoModalOpen(true);
  const handleOpenStockModal = () => setStockModalOpen(true);

  return (
    <Navbar_Wrapper>
      <Navbar_Container>
        <Left_Section>
          <span>Distribuidora Sur S.A.</span>
        </Left_Section>
        <Center_Section>
          <SearchInput />
        </Center_Section>
        <Right_Section>
          <Dollar_Icon onClick={handleOpenCobrarModal}></Dollar_Icon>
          <NotificationBell />
          <UserProfile name={userName} imageUrl={userImage} />
        </Right_Section>
      </Navbar_Container>
      {pedidoModalOpen && (
        <Cobrar_Detail onClose={() => setPedidoModalOpen(false)} />
      )}
    </Navbar_Wrapper>
  );
};

const Navbar_Wrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.background};
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
  gap: 10px;
  width: 30%;
  color: ${({ theme }) => theme.colors.text};
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
  gap: 25px;
  margin-right: -10rem;
`;
