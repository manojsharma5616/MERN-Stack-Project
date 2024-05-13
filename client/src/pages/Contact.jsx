import { useState } from "react";
import { useAuth } from "../store/auth";
const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};
const Contact = () => {
  // const [contact, setContact] = useState({
  //   username: "",
  //   email: "",
  //   message: "",
  // });
  const [contact, setContact] = useState(defaultContactFormData);
  //------------get user login data-------
  const { user,API } = useAuth();
  const [userData, setUserData] = useState(true);
  if (user && userData) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });
    setUserData(false);
  }
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // setContact({
    //   ...contact,
    //   [name]: value,
    // });
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(contact);
    try {
      const response = await fetch(`${API}/api/form/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      // console.log("register form ", response);
      if (response.ok) {
        setContact(defaultContactFormData);
        const res_data = await response.json();
        console.log("res_data", res_data);
      }
    } catch (error) {
      console.log("contact form error ", error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="we are always ready to help" />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56974.740285535736!2d75.73285925335693!3d26.810635443530543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dca6cc31968b1%3A0x30a5a0acd5c3017b!2sSanganer%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1714391762998!5m2!1sen!2sin"
            width="100%"
            height="300"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};
export default Contact;
