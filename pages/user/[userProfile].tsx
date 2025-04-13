
import styled, { keyframes } from "styled-components";
import Image from "next/image";

export default function UserProfilePage() {
  const usuario = "Nicolas"; 

  const handleLogout = () => {
    console.log("Cerrando sesión...");
  };

  return (
    <Wrapper>
      <Content>
        <FadeSlideIn>
          <Image_Block>
            <Image
              src="/images/user-profile.png"
              alt="User Profile"
              width={200}
              height={200}
              style={{ objectFit: "contain", borderRadius: "50%" }}
            />
          </Image_Block>
        </FadeSlideIn>
        <FadeSlideIn>
          <Text_Block>
            <User_Nombre>{usuario}</User_Nombre>
            <User_Info>
              <DetailItem>
                <h3>Email:</h3>
                <p>usuario@correo.com</p>
              </DetailItem>
              <DetailItem>
                <h3>Telefono:</h3>
                <p>11-9876-5432</p>
              </DetailItem>
              <DetailItem>
                <h3>Ubicacion:</h3>
                <p>Buenos Aires, Argentina</p>
              </DetailItem>
              <DetailItem>
                <h3>Rol:</h3>
                <p>User-Standar</p>
              </DetailItem>
              <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
            </User_Info>
          </Text_Block>
        </FadeSlideIn>
      </Content>
    </Wrapper>
  );
}

const Navbar_Height = "4rem";
const Sidebar_Width = "6rem";

const Wrapper = styled.div`
  position: fixed;
  top: ${Navbar_Height};
  left: ${Sidebar_Width};
  width: calc(100vw - ${Sidebar_Width});
  height: calc(100vh - ${Navbar_Height});
  overflow: hidden;
  display: flex;
  justify-content: center;  
  align-items: center;      
`;

const Content = styled.div`
  display: flex;
  width: 80%;
  height: 95%;
  padding: 5rem;
  box-sizing: border-box;
  gap: 2rem;
  justify-content: center;  
`;

const fadeSlideIn = keyframes`
  from { 
    transform: translateY(30px); 
    opacity: 0; 
  }
  to { 
    transform: translateY(0); 
    opacity: 1; 
  }
`;

const FadeSlideIn = styled.div`
  width: 60%;
  animation: ${fadeSlideIn} 0.7s ease-in-out forwards;
`;

const Image_Block = styled.div`
  background-color: black;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
`;

const Text_Block = styled.div`
  height: 80%;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;


const User_Nombre = styled.h1`
  font-size: 3rem;
  font-weight: 800;
`;

const User_Info = styled.div`
  font-size: 1.25rem;
  color: #333;
`;

const DetailItem = styled.div`
  font-family: 'YourFontFamily', sans-serif; 
  display: flex;
  justify-content: flex-start;
  padding-right: 1rem;
  gap: 1rem;
  align-items: center;
  width: 100%;

  h3 {
    font-family: 'YourFontFamily', sans-serif; 
    font-weight: bold;
    font-size: 1.1rem;
    min-width: 150px;  
  }

  p {
    font-family: 'YourFontFamily', sans-serif; 
    font-weight: 200;
    text-align: left;  
    flex-grow: 1;  
  }
`;

const SocialMediaSection = styled.div`
  margin-top: 2rem;
  h3 {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const SocialMediaItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const IconBlock = styled.div`
  width: 40px;
  height: 40px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const UrlInput = styled.input`
  width: 250px;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
`;

const Divider = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #ccc;
`;

const LogoutButton = styled.button`
  background: #111;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 200;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 5rem;

  &:hover {
    background: #045689;
  }

  &:disabled {
    background: #999;
    cursor: not-allowed;
  }
`;
