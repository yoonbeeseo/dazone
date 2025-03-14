import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import Loading from "../shared/Loading";

const Home = lazy(() => import("./Home"));
const Product = lazy(() => import("./Product"));
const MyAccount = lazy(() => import("./MyAccount"));
const Cart = lazy(() => import("./Cart"));
const RootLayout = lazy(() => import("../layouts/RootLayout"));
const ProductDetail = lazy(() => import("./ProductDetail"));
const Signup = lazy(() => import("./Signup"));

export default function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={RootLayout}>
            <Route index Component={Home} />
            <Route path="cart" Component={Cart} />
            <Route path="myAccount" Component={MyAccount} />
            <Route path="signup" Component={Signup} />
            <Route path="product">
              <Route index Component={Product} />
              <Route path=":pid" Component={ProductDetail} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
