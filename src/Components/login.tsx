import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/useAuth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { login,token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(token){
      navigate("/");
    }

  },[login,navigate,token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/authenticate",
        {
          email: email,
          password: password,
        }
      );

      const { userId, userType,token } = response.data.data;
      console.log(userId);
      login(userId, userType, token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userType", userType);
      localStorage.setItem("token", token);
      
      console.log(response.data.data);

      if (userType === "1") {
        navigate("/", { state: { userId } });
        const jobseeker = await axios.get(
          `http://localhost:8080/jobseekers/${userId}`);
          console.log(jobseeker);
          const jobseekerid=jobseeker.data.data;
          localStorage.setItem("jobSeekerId", jobseekerid);

      } else {
        const company = await axios.get(
          `http://localhost:8080/api/companies/company/${userId}`);
          console.log(company);
          const companyid=company.data.data;
          localStorage.setItem("companyId", companyid);
        navigate("/", { state: { userId } });
      }
      // setIsLoggedIn(true);
      window.location.reload();
    } catch (error) {
      setError("Invalid email or password");
    }
  };


  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-zinc-100 dark:bg-zinc-900">
        <div className="bg-primary text-white font-bold  text-center  py-6 rounded w-full">
          Login
        </div>
        <main className="w-full max-w-md mx-auto mt-16  bg-white dark:bg-zinc-800 shadow-sm rounded-lg">
          <div className="px-8 py-6">
            {error && <p className="mb-4 text-red-600">{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="mb-4 justify-center rounded place-items-center">
                <label
                  htmlFor="email"
                  className="block text-zinc-700 dark:text-zinc-300"
                >
                  Email
                </label>
                <input
                  type="Email"
                  id="email"
                  value={email}
                onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Email *"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-zinc-700 dark:text-zinc-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Password *"
                  required
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded"
                  
                >
                  Login
                </button>
              </div>
              <div className="text-center text-zinc-700 dark:text-zinc-300">
                Not a member?{" "}
                <NavLink
                  to="/register"
                  className="text-primary text-semibold hover:text-bold "
                >
                  <span>Register</span>
                </NavLink>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
