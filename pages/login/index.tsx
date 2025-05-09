import { Login } from "@/components/organisms/login/Login";

function LoginPage() {
  return <Login />;
}

(LoginPage as any).getLayout = (page: React.ReactNode) => page;

export default LoginPage;
