import { FC, useState } from "react";
import styled from "styled-components";
import { Password_Change } from "./Password_Change";
import { useLang } from "@/context/Language_Context";





export const Settings_Account: FC = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userRole, setUserRole] = useState("user");
    const [userPhone, setUserPhone] = useState("");    
    const { t } = useLang();

  return (
    <AccountContainer>
      <SettingsSection>
        <SectionTitle>{t.settings.accountTab.infoAccount}</SectionTitle>

        <ItemGroup>
          <Label>{t.settings.accountTab.name}</Label>
          <EmailInput
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your Name"
          />
        </ItemGroup>

        <ItemGroup>
          <Label>{t.settings.accountTab.email}</Label>
          <EmailInput
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </ItemGroup>

        <ItemGroup>
          <Label>{t.settings.accountTab.address}</Label>
          <EmailInput
            type="text"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            placeholder="Your Address"
          />
        </ItemGroup>

        <ItemGroup>
          <Label>{t.settings.accountTab.role}</Label>
          <SelectStyled
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </SelectStyled>
        </ItemGroup>

        <ItemGroup>
          <Label>{t.settings.accountTab.phone}</Label>
          <EmailInput
            type="tel"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            placeholder="+00 000 000000"
          />
        </ItemGroup>

        


      </SettingsSection>
      <Password_Change />
    </AccountContainer>
  );
};

const AccountContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
`;

const SettingsSection = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.contenedores};
  padding: 1.5rem;
  border-radius: 12px;
  width: 40%;
  height: 400px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.subtitle};
  font-size: ${({ theme }) => theme.fontSizes.text}px;
`;


const EmailInput = styled.input`
  padding: 0.5rem;
  border-radius: 6px;
  width: 60%;
  font-size: 0.875rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SelectStyled = styled.select`
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
  background-color: ${({ theme }) => theme.colors.contenedores};
  color: ${({ theme }) => theme.colors.subtitle};
  font-size: 0.875rem;
  width: 20%;
`;

const ItemGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
