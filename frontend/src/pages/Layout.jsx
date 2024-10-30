import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="max-w-[950px] h-screen mx-auto max-md:px-3 md:p-1">
      <Header />
      <section className="my-10">
        <Outlet />
      </section>
    </div>
  );
};

export default Layout;
