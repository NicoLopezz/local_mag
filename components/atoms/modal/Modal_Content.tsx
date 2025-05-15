import styled from "styled-components";

export const Modal_Content = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.modal};
  padding: 2rem;
  border-radius: 12px;
  min-width: 300px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  animation: fadeInContent 0.2s ease-out;

  &.closing {
    animation: fadeOutContent 0.2s ease-in forwards;
  }

  @keyframes fadeInContent {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeOutContent {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }
`;
