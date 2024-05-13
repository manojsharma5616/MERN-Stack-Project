import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
const Login = () => {
  const navigate = useNavigate();
  const { storeTokenInLS,API } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      // console.log("login form ", response);
      const res_data = await response.json();
      // console.log("login res_data", res_data);
      // console.log("login res_data", res_data.extraDetails);
      if (response.ok) {
        setUser({
          email: "",
          password: "",
        });
        //-------store token data in localstoreage-----
        // const res_data = await response.json();
        // console.log("login res_data", res_data);
        // localStorage.setItem("login token", res_data.token);
        storeTokenInLS(res_data.token);
        toast.success("Login Successfully");
        navigate("/");
        // alert("login successfully");
      } else {
        // alert("Invalid creaditionaly");
        // alert(res_data.extraDetails?res_data.extraDetails:res_data.Message);
        toast.error(res_data.extraDetails?res_data.extraDetails:res_data.Message);
      }
    } catch (error) {
      console.log("login error ", error);
    }
  };
  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/login.png"
                  alt="a girl trying to do login"
                  width={500}
                  height={500}
                />
              </div>
              {/* let tackle registration form*/}
              <div className="registration-form">
                <h1 className="main-heading mb-3">login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Login;
