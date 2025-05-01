import { FC, ReactNode } from "react";
import styled from "styled-components";
import { Sidebar_Icon } from "../../atoms/sidebar/Sidebar_Icon";
import { Sidebar_Text } from "../../atoms/sidebar/Sidebar_Text";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  icon: ReactNode;
  text: string;
  href: string;
}

export const Item: FC<Props> = ({ icon, text, href }) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref legacyBehavior>
      <Item_Container $active={isActive}>
        <Active_Bar $active={isActive} />
        <Sidebar_Icon icon={icon} />
        <Sidebar_Text_Wrapper $active={isActive}>
          {text}
        </Sidebar_Text_Wrapper>
      </Item_Container>
    </Link>
  );
};

const Item_Container = styled.a<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 5rem;
  width: 100%;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
  font-size: 1.4rem;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Active_Bar = styled.div<{ $active?: boolean }>`
  position: absolute;
  margin-left: 2px;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: ${({ $active }) => ($active ? "#2f3a4a" : "transparent")};
  border-radius: 0 4px 4px 0;
  transition: background-color 0.3s ease;
`;

const Sidebar_Text_Wrapper = styled.span<{ $active?: boolean }>`
  font-size: ${({ theme, $active }) =>
    $active
      ? `${theme.fontSizes.text }px`
      : `${theme.fontSizes.text* 0.9}px`};

  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  margin-top: 4px;
  transition: all 0.2s ease;
  text-align: center;
`;
