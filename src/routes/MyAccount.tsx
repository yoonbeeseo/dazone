import { MY } from "../contextApi";
import AddProduct from "./AddProduct";
import AuthPage from "./Auth.page";
import MyBasicInfo from "./MyBasicInfo";
import MyPassword from "./MyPassword";
import MyProducts from "./MyProducts";
import MyTab from "./MyTab";

const MyAccount = ({ user }: { user: User | null }) => {
  const { target } = MY.store();
  return !user ? (
    <AuthPage />
  ) : (
    <div
      className="flex max-w-300 mx-auto px-2.5"
      style={{
        minHeight: "calc(100vh - 61px)",
      }}
    >
      <MyTab />
      <main className="m-5 flex-1">
        {
          {
            기본정보: <MyBasicInfo {...user} />,
            비밀번호변경: <MyPassword {...user} />,
            상품등록: <AddProduct {...user} />,
            나의상품: <MyProducts {...user} />,
          }[target]
        }
      </main>
    </div>
  );
};

export default MyAccount;
