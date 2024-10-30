import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../context/JobContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      const data = { email, password };

      const response = await fetch(API_URL + "/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (response.ok) {
        navigate("/");
      } else {
        alert("Wrong credentails!");
      }
    } else {
      alert("Enter credentails!");
    }
  };

  return (
    <>
      <form className="max-w-[600px] h-full mx-auto mt-20 flex flex-col justify-start items-center gap-5">
        <h2 className="py-5 text-3xl capitalize font-semibold">Login page</h2>

        <div className="mx-auto grid grid-cols-2 grid-rows-2 gap-5 text-end">
          <label htmlFor="e-mail">Email:</label>

          <input
            id="e-mail"
            className="py-1 px-2 border border-gray-400 rounded-md"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="pass-word">Password:</label>

          <input
            id="pass-word"
            className="py-1 px-2 border border-gray-400 rounded-md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="button" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
