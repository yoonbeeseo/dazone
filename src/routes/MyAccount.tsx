import { MY } from "../contextApi";
import AuthPage from "./Auth.page";
import MyBasicInfo from "./MyBasicInfo";
import MyPassword from "./MyPassword";
import MyTab from "./MyTab";

const MyAccount = (user: User) => {
  const { target } = MY.store();
  return !user ? (
    <AuthPage />
  ) : (
    <div
      className="flex max-w-300 mx-auto px-2.5"
      style={{
        height: "calc(100vh - 61px)",
      }}
    >
      <MyTab />
      <main className="m-5 flex-1">
        {
          {
            기본정보: <MyBasicInfo {...user} />,
            비밀번호변경: <MyPassword {...user} />,
          }[target]
        }
      </main>
    </div>
  );
};

export default MyAccount;
