import styled from "styled-components";

export const Modal_Content_Base = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.modal};
  border-radius: 12px;
  padding: 2rem;
  width: 85vw;
  height: 85vh;
  max-width: 90%;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  animation: scaleIn 0.3s ease-out;

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
