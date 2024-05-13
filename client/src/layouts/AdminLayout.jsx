import React from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaServer,FaHome ,FaUser} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import {useAuth} from '../store/auth';
const AdminLayout = () => {
  const {user,loading}=useAuth();
  console.log("AdminLayout User Data ",user);
  if(loading){
    return <h1>loading.........</h1>;
  }
  if(!user.isAdmin){
    return <Navigate to={'/'}></Navigate>
  }
  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to={"/admin/users"}><FaUser/> Users</NavLink>
              </li>
              <li>
                <NavLink to={"/admin/contacts"}><FaMessage/> Contacts</NavLink>
              </li>
              <li>
                <NavLink to={"/services"}><FaServer/> Services</NavLink>
              </li>
              <li>
                <NavLink to={"/"}><FaHome/> Home</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet></Outlet>
    </>
  );
};

export default AdminLayout;
