import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth} from "../store/auth";
import {toast} from "react-toastify"
const Register = () => {
  const navigate = useNavigate();
  const { storeTokenInLS,API } = useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleInput = (e) => {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
    // console.log(user);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);
    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      // console.log("register form ", response);
      const res_data = await response.json();
      // console.log("res_data ", res_data);
      console.log("res_data ", res_data.extraDetails);
      if (response.ok) {
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        //------store token data in localstorage-----
        // const res_data=await response.json();
        // console.log("res_data ",res_data);
        // localStorage.setItem("register token ",res_data.token);
        storeTokenInLS(res_data.token);
        toast.success("Registration Successfully");
        navigate("/");
      }
      else{
        // alert(res_data.extraDetails?res_data.extraDetails:res_data.Message);
        toast.error(res_data.extraDetails?res_data.extraDetails:res_data.Message);
      }
    } catch (error) {
      console.log("register error ", error);
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
                  src="/images/register.png"
                  alt="a girl trying to do registration"
                  width={500}
                  height={500}
                />
              </div>
              {/* let tackle registration form*/}
              <div className="registration-form">
                <h1 className="main-heading mb-3">registration form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
                      id="username"
                      required
                      autoComplete="off"
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>
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
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="phone"
                      id="phone"
                      required
                      autoComplete="off"
                      value={user.phone}
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
                    Register Now
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

export default Register;
