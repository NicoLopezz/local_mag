import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { EyeClose_Icon } from "../../atoms/icons/setting/EyeClose_Icon";
import { EyeOpen_Icon } from "../../atoms/icons/setting/EyeOpen_Icon";
import { useToast } from "@/context/Toast_Context";
import { useLang } from "@/context/Language_Context";

export const Password_Change: FC = () => {
  const [showFields, setShowFields] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const { showToast } = useToast();

  const [animateOut, setAnimateOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const { t } = useLang();

  useEffect(() => {
    if (showFields) {
      setShouldRender(true);
      setAnimateOut(false);
    } else if (!showFields && shouldRender) {
      setAnimateOut(true);
      const timeout = setTimeout(() => {
        setShouldRender(false);
        setAnimateOut(false);
        setCurrentPassword("");
        setNewPassword("");
        setRepeatPassword("");
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [showFields]);

  const hasLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasSpecialChar = /[\W_]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const passwordsMatch = newPassword === repeatPassword;

  const fulfilled = [hasLength, hasUppercase, hasSpecialChar, hasNumber].filter(Boolean).length;
  const strengthPercent = (fulfilled / 4) * 100;

  const handleSave = () => {
    showToast("Modificación de contraseña exitosa");
    setShowFields(false);
  };

  return (
    <PasswordSection>
      <PasswordHeader>
        <SectionTitle>{t.settings.accountTab.password}</SectionTitle>
        <ToggleVisibility onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOpen_Icon /> : <EyeClose_Icon />}
        </ToggleVisibility>
      </PasswordHeader>

      <ItemGroup>
        <Label>{t.settings.accountTab.currentPassword}</Label>
        <InputGroup>
          {showFields ? (
            <Input
              type={showPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder={t.settings.accountTab.currentPassword}
            />
          ) : (
            <MaskedPassword>••••••••</MaskedPassword>
          )}
        </InputGroup>
      </ItemGroup>

      {!showFields && (
        <ChangeButton onClick={() => setShowFields(true)}>{t.settings.accountTab.change}</ChangeButton>
      )}

      {shouldRender && (
        <AnimatedContainer visible={!animateOut}>
          <ItemGroup>
            <Label>New Password</Label>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t.settings.accountTab.enterNewPassword}
              />
            </InputGroup>
          </ItemGroup>

          <ItemGroup>
            <Label>Repeat Password</Label>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                placeholder={t.settings.accountTab.repeatNewPassword}
              />
              {!passwordsMatch && repeatPassword.length > 0 && (
                <ErrorText>Passwords do not match</ErrorText>
              )}
            </InputGroup>
          </ItemGroup>

          <CheckList>
            <CheckItem fulfilled={hasLength}>{t.settings.accountTab.minLength}</CheckItem>
            <CheckItem fulfilled={hasUppercase}>{t.settings.accountTab.uppercase}</CheckItem>
            <CheckItem fulfilled={hasSpecialChar}>{t.settings.accountTab.specialChar}</CheckItem>
            <CheckItem fulfilled={hasNumber}>{t.settings.accountTab.number}</CheckItem>
          </CheckList>

          <ProgressBar>
            <Progress style={{ width: `${strengthPercent}%` }} />
          </ProgressBar>

          <ButtonGroup>
            <CancelButton onClick={() => setShowFields(false)}>{t.settings.accountTab.cancel}</CancelButton>
            <SaveButton
              disabled={!passwordsMatch || fulfilled < 4 || !currentPassword}
              onClick={handleSave}
            >
              {t.settings.accountTab.save}  
            </SaveButton>
          </ButtonGroup>
        </AnimatedContainer>
      )}
    </PasswordSection>
  );
};

const PasswordSection = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.contenedores};
  padding: 1.5rem;
  border-radius: 12px;
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PasswordHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  color: ${({ theme }) => theme.colors.title};
  
`;

const ToggleVisibility = styled.button`
  font-size: 1.25rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.title};
`;

const ItemGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;  
`;

const Label = styled.label`
  width: 30%;
  min-width: 120px;
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  color: ${({ theme }) => theme.colors.title};
`;

const InputGroup = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
  background-color: ${({ theme }) => theme.colors.background};
  font-size: 0.875rem;
  width: 80%;
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  color: ${({ theme }) => theme.colors.title};
`;

const MaskedPassword = styled.span`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  letter-spacing: 0.2rem;
`;

const ErrorText = styled.p`
  color: #e53e3e;
  font-size: 0.75rem;
  margin: 0;
`;

const ChangeButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.toggleOff};
  border: none;
  border-radius: 6px;
  font-weight: 500;
  width: 20%;
  align-self: flex-end;
  cursor: pointer;
`;

const CheckList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
`;

const CheckItem = styled.li<{ fulfilled: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.text * 0.8}px;
  color: ${({ theme }) => theme.colors.subtitle};
  text-decoration: ${({ fulfilled }) => (fulfilled ? "line-through" : "none")};
  margin-bottom: 4px;
`;

const ProgressBar = styled.div`
  width: 50%;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 1rem;
`;

const Progress = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.button};
  transition: width 0.3s ease;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const CancelButton = styled.button`
  padding: 0.6rem 1.25rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.subtitle * 0.8}px;
  background-color: ${(props) => (props.disabled ? "#f0f0f011" : "#000000")};
  color: ${(props) => (props.disabled ? "#a0a0a0" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: scale(0.97);
  }
`;

const SaveButton = styled.button<{ disabled?: boolean }>`
  padding: 0.6rem 1.25rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.subtitle * 0.8}px;
  background-color: ${(props) => (props.disabled ? "#f0f0f011" : "#000000")};
  color: ${(props) => (props.disabled ? "#a0a0a0" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: scale(0.97);
  }
`;

const AnimatedContainer = styled.div<{ visible: boolean }>`
  animation: ${({ visible }) => (visible ? "fadeInUp" : "fadeOutDown")} 0.3s ease forwards;
  opacity: 0;
  gap: 1rem;
  transform: translateY(10px);

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOutDown {
    to {
      opacity: 0;
      transform: translateY(10px);
    }
  }
`;
