import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Error from "./pages/Error";
import Fotter from "./components/Footer/Fotter";
import Logout from "./pages/Logout";
import AdminLayout from "./layouts/AdminLayout";
import AdminUser from "./pages/AdminUser";
import AdminContact from "./pages/AdminContact";
import AdminUpdate from "./pages/AdminUpdate";
const App = () => {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/about" element={<About></About>} />
          <Route path="/contact" element={<Contact></Contact>} />
          <Route path="/services" element={<Services></Services>} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/logout" element={<Logout></Logout>}></Route>
          <Route path="*" element={<Error></Error>} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUser/>}></Route>
            <Route path="contacts" element={<AdminContact/>}></Route>
            <Route path="users/:id/edit" element={<AdminUpdate/>} />
          </Route>
        </Routes>
        <Fotter></Fotter>
      </Router>
    </>
  );
};
export default App;
