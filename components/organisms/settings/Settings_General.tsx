import { FC, useState } from "react";
import styled from "styled-components";
import { Theme_Toggle } from "@/components/molecules/setting/Theme_Toggle";
import { useThemeContext } from "@/context/Theme_Context";
import { Color_Circle_Picker } from "@/components/molecules/setting/Color_Circle_Picker";
import { useLang } from "@/context/Language_Context";

export const Settings_General: FC = () => {
  const { fontSizes, setFontSize } = useThemeContext();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(false);
  const [cambios, setCambios] = useState(false);
  const [tareas, setTareas] = useState(false);
  const [stock, setStock] = useState(false);
  const [pedidos, setPedidos] = useState(false);
  const [soundFeedback, setSoundFeedback] = useState(true);
  const [touchVibration, setTouchVibration] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [backupEmail, setBackupEmail] = useState("");
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [accountLocked, setAccountLocked] = useState(false);
  const { colors, setColor } = useThemeContext();
  const { themeMode, setThemeMode } = useThemeContext();
  const { lang, setLang } = useLang();
  const { t } = useLang();

  return (
    <Container>
      <SettingsSection>
        <SectionTitle>{t.settings.appearance}</SectionTitle>

        <ItemGroup>
          <Label>{t.settings.theme}</Label>
          <Theme_Toggle theme={themeMode} setTheme={setThemeMode} />
        </ItemGroup>

        <Subtitulo>{t.settings.fontSize.fontSize}</Subtitulo>
        <ItemGroup>
          <Label>{t.settings.fontSize.title}</Label>
          <FontSizeControl>
            <ControlButton
              onClick={() =>
                setFontSize("title", Math.max(10, fontSizes.title - 1))
              }
            >
              −
            </ControlButton>
            <SizeValue>{fontSizes.title}px</SizeValue>
            <ControlButton
              onClick={() =>
                setFontSize("title", Math.min(60, fontSizes.title + 1))
              }
            >
              +
            </ControlButton>
          </FontSizeControl>
        </ItemGroup>

        <ItemGroup>
          <Label>{t.settings.fontSize.subtitle}</Label>
          <FontSizeControl>
            <ControlButton
              onClick={() =>
                setFontSize("subtitle", Math.max(10, fontSizes.subtitle - 1))
              }
            >
              −
            </ControlButton>
            <SizeValue>{fontSizes.subtitle}px</SizeValue>
            <ControlButton
              onClick={() =>
                setFontSize("subtitle", Math.min(40, fontSizes.subtitle + 1))
              }
            >
              +
            </ControlButton>
          </FontSizeControl>
        </ItemGroup>

        <ItemGroup>
          <Label>{t.settings.fontSize.text}</Label>
          <FontSizeControl>
            <ControlButton
              onClick={() =>
                setFontSize("text", Math.max(8, fontSizes.text - 1))
              }
            >
              −
            </ControlButton>
            <SizeValue>{fontSizes.text}px</SizeValue>
            <ControlButton
              onClick={() =>
                setFontSize("text", Math.min(30, fontSizes.text + 1))
              }
            >
              +
            </ControlButton>
          </FontSizeControl>
        </ItemGroup>

        <ItemGroup>
          <ColorGrid>
            <Color_Circle_Picker
              label={t.settings.colors.title}
              value={colors.title}
              onChange={(color) => setColor("title", color)}
            />

            <Color_Circle_Picker
              label={t.settings.colors.subtitle}
              value={colors.subtitle}
              onChange={(color) => setColor("subtitle", color)}
            />

            <Color_Circle_Picker
              label={t.settings.colors.button}
              value={colors.button}
              onChange={(color) => setColor("button", color)}
            />

            <Color_Circle_Picker
              label={t.settings.colors.icon}
              value={colors.icon}
              onChange={(color) => setColor("icon", color)}
            />

            <Color_Circle_Picker
              label={t.settings.colors.toggleOff}
              value={colors.toggleOn}
              onChange={(color) => setColor("toggleOn", color)}
            />

            <Color_Circle_Picker
              label={t.settings.colors.toggleOn}
              value={colors.toggleOff}
              onChange={(color) => setColor("toggleOff", color)}
            />
          </ColorGrid>
        </ItemGroup>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>{t.settings.security}</SectionTitle>

        <ItemGroup>
          <Label>{t.settings.twoFactor}</Label>
          <ToggleWrapper>
            <ToggleInput
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
            />
            <ToggleSlider />
          </ToggleWrapper>
        </ItemGroup>

        <ItemGroup>
          <Label>{t.settings.backupEmail}</Label>
          <EmailInput
            type="email"
            value={backupEmail}
            onChange={(e) => setBackupEmail(e.target.value)}
            placeholder="yourbackup@email.com"
          />
        </ItemGroup>

        <ItemGroup>
          <Label>{t.settings.sessionTimeout}(min)</Label>
          <SelectStyled
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(e.target.value)}
          >
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="60">60</option>
          </SelectStyled>
        </ItemGroup>

        <ItemGroup>
          <Label>{t.settings.lockAccount}</Label>
          <ToggleWrapper>
            <ToggleInput
              type="checkbox"
              checked={accountLocked}
              onChange={() => setAccountLocked(!accountLocked)}
            />
            <ToggleSlider />
          </ToggleWrapper>
        </ItemGroup>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>{t.settings.preferences}</SectionTitle>

        <ItemGroup>
          <Label>{t.settings.language}</Label>
          <SelectStyled
            value={lang}
            onChange={(e) => setLang(e.target.value as "en" | "es")}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </SelectStyled>
        </ItemGroup>

        <ItemGroup>
          <Label>{t.settings.autoSync}</Label>
          <ToggleWrapper>
            <ToggleInput
              type="checkbox"
              checked={autoSync}
              onChange={() => setAutoSync(!autoSync)}
            />
            <ToggleSlider />
          </ToggleWrapper>
        </ItemGroup>

        <ItemGroup>
          <Label>{t.settings.soundFeedback}</Label>
          <ToggleWrapper>
            <ToggleInput
              type="checkbox"
              checked={soundFeedback}
              onChange={() => setSoundFeedback(!soundFeedback)}
            />
            <ToggleSlider />
          </ToggleWrapper>
        </ItemGroup>

        <ItemGroup>
          <Label>{t.settings.touchVibration}</Label>
          <ToggleWrapper>
            <ToggleInput
              type="checkbox"
              checked={touchVibration}
              onChange={() => setTouchVibration(!touchVibration)}
            />
            <ToggleSlider />
          </ToggleWrapper>
        </ItemGroup>

        <ItemGroup>
          <Label>{t.settings.offlineMode}</Label>
          <ToggleWrapper>
            <ToggleInput
              type="checkbox"
              checked={offlineMode}
              onChange={() => setOfflineMode(!offlineMode)}
            />
            <ToggleSlider />
          </ToggleWrapper>
        </ItemGroup>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>{t.settings.notifications}</SectionTitle>
        <NotificaionesGrid>
          <ItemGroup>
            <Label>{t.settings.sections.envios}</Label>
            <ToggleWrapper>
              <ToggleInput
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
              />
              <ToggleSlider />
            </ToggleWrapper>
          </ItemGroup>

          <ItemGroup>
            <Label>{t.settings.sections.cambios}</Label>
            <ToggleWrapper>
              <ToggleInput
                type="checkbox"
                checked={cambios}
                onChange={() => setCambios(!cambios)}
              />
              <ToggleSlider />
            </ToggleWrapper>
          </ItemGroup>

          <ItemGroup>
            <Label>{t.settings.sections.ventas}</Label>
            <ToggleWrapper>
              <ToggleInput
                type="checkbox"
                checked={cambios}
                onChange={() => setCambios(!cambios)}
              />
              <ToggleSlider />
            </ToggleWrapper>
          </ItemGroup>

          <ItemGroup>
            <Label>{t.settings.sections.tareas}</Label>
            <ToggleWrapper>
              <ToggleInput
                type="checkbox"
                checked={tareas}
                onChange={() => setTareas(!tareas)}
              />
              <ToggleSlider />
            </ToggleWrapper>
          </ItemGroup>

          <ItemGroup>
            <Label>{t.settings.sections.stock}</Label>
            <ToggleWrapper>
              <ToggleInput
                type="checkbox"
                checked={stock}
                onChange={() => setStock(!stock)}
              />
              <ToggleSlider />
            </ToggleWrapper>
          </ItemGroup>

          <ItemGroup>
            <Label>{t.settings.sections.pedidos}</Label>
            <ToggleWrapper>
              <ToggleInput
                type="checkbox"
                checked={pedidos}
                onChange={() => setPedidos(!pedidos)}
              />
              <ToggleSlider />
            </ToggleWrapper>
          </ItemGroup>
        </NotificaionesGrid>
      </SettingsSection>
    </Container>
  );
};

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem 1rem;
  width: 60%;
  margin-top: 1rem;
`;

const NotificaionesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem 1rem;
  width: 60%;
  margin-top: 1rem;
`;

const ColorPickerWrapper = styled.label<{ color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  cursor: pointer;
  display: inline-block;
`;

const Subtitulo = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  margin-bottom: 10px;
`;

const HiddenColorInput = styled.input`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
`;

const ColorSectionTitle = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  color: #1a202c;
`;

const ColorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const ColorCode = styled.span`
  font-size: 0.85rem;
  font-family: monospace;
  color: #4a5568;
  min-width: 80px;
`;

const ColorLabelText = styled.span`
  width: 90px;
  font-size: 0.875rem;
  color: #2d3748;
`;

const ColorBlock = styled.div<{ color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #cbd5e0;
  background-color: ${({ color }) => color};
`;

const ColorPicker = styled.input`
  appearance: none;
  background: none;
  width: 32px;
  height: 32px;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid #ccc;
  padding: 0;
`;

const EmailInput = styled.input`
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
  background-color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  width: 60%;
`;

const SelectStyled = styled.select`
  padding: 0.5rem;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.contenedores};
  color: ${({ theme }) => theme.colors.subtitle};
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  width: auto;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 1rem;
`;

const SettingsSection = styled.div`
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.contenedores};
  width: 80%;
  height: 90%;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  color: ${({ theme }) => theme.colors.title};
`;

const ItemGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.subtitle};
  font-size: ${({ theme }) => theme.fontSizes.text}px;
`;

const FontSizeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.title};
`;

const ControlButton = styled.button`
  background-color: ${({ theme }) => theme.colors.button};
  border: none;
  border-radius: 6px;
  width: 25px;
  height: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  color: white;
`;

const SizeValue = styled.span`
  font-size: 0.9rem;
  min-width: 60px;
  text-align: center;
  color: ${({ theme }) => theme.colors.subtitle};
`;

const ThemeGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ThemeButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ active }) => (active ? "#000" : "#ccc")};
  background-color: ${({ active }) => (active ? "#000" : "#f8f8f8")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
`;

const ToggleWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + span {
    background-color: ${({ theme }) => theme.colors.toggleOff};
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.toggleOn};
  transition: 0.4s;
  border-radius: 28px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }
`;

const ThemeToggle = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 32px;
`;

const ThemeCheckbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #1a202c;
  }

  &:checked + span:before {
    transform: translateX(28px);
    background-color: #f9f9f9;
  }
`;

const ThemeSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e2e8f0;
  transition: 0.4s;
  border-radius: 32px;

  &:before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    left: 4px;
    top: 4px;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.4s;
  }
`;
