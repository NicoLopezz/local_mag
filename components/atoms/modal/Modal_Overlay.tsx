import styled from "styled-components";

export const Modal_Overlay = styled.div`
  
  position: fixed;
  top: 0;
  left: 0;
  width: 99vw;
  height: 100vh;
  /* background-color: red; */
  backdrop-filter: blur(6px);
  z-index: 99999999999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.10s ease-out;
  
  &.closing {
    animation: fadeOut 0.10s ease-in forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
