import { FC, useState } from "react";
import styled, { css } from "styled-components";
import { useLang } from "@/context/Language_Context";
import { Input_FloatLabel } from "@/components/molecules/login/Input_FloatLabel";
import { Language_Switch } from "@/components/molecules/login/Language_Switch";
import { EyeClose_Icon } from "../../atoms/icons/setting/EyeClose_Icon";
import { EyeOpen_Icon } from "../../atoms/icons/setting/EyeOpen_Icon";
import { Modal_Terms } from "@/components/molecules/login/Modal_Terms";

interface Props {}

export const Login: FC<Props> = () => {
  const { t } = useLang();
  const [activePanel, setActivePanel] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatEmail, setRepeatEmail] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const LanguageSelector: FC = () => {
    const { lang, setLang } = useLang();
    return <Language_Switch activeLang={lang} onSelect={setLang} />;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!email.trim()) {
      setEmailError(t.login.errorEmailRequired);
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError(t.login.errorPasswordRequired);
      valid = false;
    } else {
      setPasswordError("");
    }
    if (!valid) return;
    setShowTerms(true);
  };

  return (
    <Wrapper>
      <LanguageSelector />
      <AuthContainer>
        <PanelContainer>
          <AuthPanel $active={activePanel === "login"}>
            <ToggleButton
              onClick={() => setActivePanel("register")}
              $position="right"
            >
              {t.login.goToRegister} <span>→</span>
            </ToggleButton>

            <PanelContent>
              <Title>{t.login.titleLogin}</Title>
              <Form onSubmit={handleSubmit}>
                <PassWord_Wrapper>
                  <Input_FloatLabel
                    label={t.login.email}
                    type="email"
                    value={email}
                    onChange={setEmail}
                    error={emailError}
                  />
                  <InputWrapper>
                    <Input_FloatLabel
                      label={t.login.password}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={setPassword}
                      error={passwordError}
                    />
                    <IconToggle
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOpen_Icon /> : <EyeClose_Icon />}
                    </IconToggle>
                  </InputWrapper>
                </PassWord_Wrapper>
                <SubmitButton type="submit">{t.login.enter}</SubmitButton>
                <TermsWrapper>
                  <LinkText href="#">{t.login.terms}</LinkText>
                  <Separator>|</Separator>
                  <LinkText href="#">{t.login.privacy}</LinkText>
                </TermsWrapper>
              </Form>
            </PanelContent>
          </AuthPanel>

          <AuthPanel $active={activePanel === "register"}>
            <ToggleButton
              onClick={() => setActivePanel("login")}
              $position="left"
            >
              <span>←</span> {t.login.goToLogin}
            </ToggleButton>

            <PanelContent>
              <Title>{t.login.titleRegister}</Title>
              <Form>
                <PassWord_Wrapper>
                  <Input_FloatLabel
                    label={t.login.email}
                    type="email"
                    value={email}
                    onChange={setEmail}
                    error={emailError}
                  />
                  <Input_FloatLabel
                    label={t.login.repeatEmail}
                    type="email"
                    value={repeatEmail}
                    onChange={setRepeatEmail}
                    validateMatch={{
                      compareWith: email,
                      errorMessage: t.login.errorEmail,
                    }}
                  />
                </PassWord_Wrapper>

                <PassWord_Wrapper>
                  <InputWrapper>
                    <Input_FloatLabel
                      label={t.login.password}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={setPassword}
                      error={passwordError}
                    />
                    <IconToggle
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOpen_Icon /> : <EyeClose_Icon />}
                    </IconToggle>
                  </InputWrapper>

                  <InputWrapper>
                    <Input_FloatLabel
                      label={t.login.repeatPassword}
                      type={showRepeatPassword ? "text" : "password"}
                      value={repeatPassword}
                      onChange={setRepeatPassword}
                      validateMatch={{
                        compareWith: password,
                        errorMessage: t.login.errorPassword,
                      }}
                    />
                    <IconToggle
                      onClick={() => setShowRepeatPassword((prev) => !prev)}
                    >
                      {showRepeatPassword ? (
                        <EyeOpen_Icon />
                      ) : (
                        <EyeClose_Icon />
                      )}
                    </IconToggle>
                  </InputWrapper>
                </PassWord_Wrapper>

                <SubmitButton type="submit">{t.login.register}</SubmitButton>
              </Form>
            </PanelContent>
          </AuthPanel>

          <Slider $activePanel={activePanel} />
        </PanelContainer>
      </AuthContainer>
      <Modal_Terms visible={showTerms} onAccept={() => setShowTerms(false)} />
    </Wrapper>
  );
};

const PassWord_Wrapper = styled.div`
  display: grid;
  gap: 1rem;
`;

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  min-height: 95dvh;
  padding: 2rem;
  @media (max-width: 1300px) {
    padding: 0rem;
    min-height: 100dvh;
  }
`;


const TermsWrapper = styled.div`
  margin-top: 1.5rem;
  font-size: 0.8rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;

const LinkText = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Separator = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

const AuthContainer = styled.div`
  width: 100%;
  max-width: 800px;
  position: relative;
`;


const PanelContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 700px;
  border-radius: 16px;
  background-color: #f6f6f670;
  border: 1px solid #ccc;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  @media (max-width: 1300px) {
    height: 85dvh;
  }
`;


const AuthPanel = styled.div<{ $active: boolean }>`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.4s ease;
  z-index: 1;

  ${({ $active }) =>
    !$active &&
    css`
      opacity: 0;
      pointer-events: none;
      user-select: none;
    `}
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s ease;
  z-index: ${({ $active }) => ($active ? 2 : 1)};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: ${({ $active }) =>
    $active ? "translateX(0)" : "translateX(10px)"};
  visibility: ${({ $active }) => ($active ? "visible" : "hidden")};
  pointer-events: ${({ $active }) => ($active ? "auto" : "none")};
  background-color: white;
`;

const ToggleButton = styled.button<{ $position: "left" | "right" }>`
  position: absolute;
  top: 1.5rem;
  display: flex;
  gap: 10px;
  ${({ $position }) => $position}: 1.5rem;
  background: none;
  border: none;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  align-items: center;
  justify-items: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const PanelContent = styled.div`
  width: 100%;
  max-width: 320px;
  color: ${({ theme }) => theme.colors.text};
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 4rem;
  font-weight: 200;
  text-align: center;
  @media (max-width: 1300px) {
    font-size: 1.5rem;
    margin-top: 0rem;
    margin-bottom: 2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  @media (max-width: 1300px) {
    gap: 1rem;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const IconToggle = styled.div`
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.138);
  background: rgba(9, 9, 9, 0);
  color: black;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:focus {
    outline: 1px solid black;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.colors.button};
  background-color: black;
  color: white;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Slider = styled.div<{ $activePanel: "login" | "register" }>`
  position: absolute;
  top: 0;
  left: ${({ $activePanel }) => ($activePanel === "login" ? "0%" : "50%")};
  width: 50%;
  height: 100%;
  background-color: #00000012;
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;
