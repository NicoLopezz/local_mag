import { FC } from "react";
import styled from "styled-components";
import { useState } from "react";

import { SearchInput } from "../../molecules/navbar/Search_Input";
import { NotificationBell } from "../../molecules/navbar/Notification_Bell";
import { UserProfile } from "../../molecules/navbar/User_Profile";
import { Cobrar_Detail } from "../../organisms/cobrar_modals/Cobrar_Detail";

interface Props {
  userName: string;
  userImage: string;
}

export const Navbar: FC<Props> = ({ userName, userImage }) => {
  const [pedidoModalOpen, setPedidoModalOpen] = useState(false);
  const handleAddPedido = () => setPedidoModalOpen(true);

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
          <Cobrar_Button onClick={handleAddPedido}>Cobrar</Cobrar_Button>
          <NotificationBell />
          <UserProfile name={userName} imageUrl={userImage} />
        </Right_Section>
      </Navbar_Container>
      {pedidoModalOpen && (
        <Cobrar_Detail
          
          onClose={() => setPedidoModalOpen(false)}
        />
      )}
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
  gap: 10px;
  width: 30%;
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

const Cobrar_Button = styled.button`
  background: #000000a3;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: #1f1f1f;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const Right_Section = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
`;