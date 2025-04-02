import styled from "styled-components";

export const Modal_Content = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: scaleIn 0.3s ease-out;
  transform: translateY(0);


  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-align: center;
  }
`;
