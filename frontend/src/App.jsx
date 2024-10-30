import "./App.css";
import { JobContextProvider } from "./context/JobContext";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Addpage from "./pages/Addpage";
import Editpage from "./pages/Editpage";
import Viewpage from "./pages/Viewpage";

const App = () => {
  return (
    <div>
      <JobContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="login" element={<Login />} />
            <Route path="add" element={<Addpage />} />
            <Route path="edit/:id" element={<Editpage />} />
            <Route path="view/:id" element={<Viewpage />} />
          </Route>
        </Routes>
      </JobContextProvider>
    </div>
  );
};

export default App;
