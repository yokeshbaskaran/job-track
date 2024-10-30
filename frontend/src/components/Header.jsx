import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="border-b h-[50px] p-2">
        <nav className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            <Link to="/">JobTrack</Link>
          </h2>

          <ul className="flex items-center gap-3">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
