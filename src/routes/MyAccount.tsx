import { AUTH } from "../contextApi/context";
import AuthPage from "./Auth.page";

const MyAccount = () => {
  const { user } = AUTH.use();
  return !user ? <AuthPage /> : <div>MyAccount</div>;
};

export default MyAccount;
