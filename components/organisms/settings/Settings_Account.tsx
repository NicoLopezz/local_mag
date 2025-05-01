import { FC, useState } from "react";
import styled from "styled-components";
import { Password_Change } from "./Password_Change";





export const Settings_Account: FC = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userRole, setUserRole] = useState("user");
    const [userPhone, setUserPhone] = useState("");
    const [userLanguage, setUserLanguage] = useState("es");
    

  return (
    <AccountContainer>
      <SettingsSection>
        <SectionTitle>Informacion de la cuenta</SectionTitle>

        <ItemGroup>
          <Label>Name</Label>
          <EmailInput
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your Name"
          />
        </ItemGroup>

        <ItemGroup>
          <Label>Email</Label>
          <EmailInput
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </ItemGroup>

        <ItemGroup>
          <Label>Address</Label>
          <EmailInput
            type="text"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            placeholder="Your Address"
          />
        </ItemGroup>

        <ItemGroup>
          <Label>Role</Label>
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
          <Label>Phone</Label>
          <EmailInput
            type="tel"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            placeholder="+00 000 000000"
          />
        </ItemGroup>

        <ItemGroup>
          <Label>Language</Label>
          <SelectStyled
            value={userLanguage}
            onChange={(e) => setUserLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </SelectStyled>
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
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #eee;
  width: 40%;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  color: #333;
`;


const EmailInput = styled.input`
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.875rem;
  width: 60%;
`;

const SelectStyled = styled.select`
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.875rem;
  width: 20%;
`;

const ItemGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
