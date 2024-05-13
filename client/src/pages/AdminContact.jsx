import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
const AdminContact = () => {
  const { authorizationToken,API } = useAuth();
  const [contactData, setContactData] = useState([]);
  const getContactsData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("contact data ", data);
      setContactData(data);
    } catch (error) {
      console.log(error);
    }
  };
  // delete the user on delete button
  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log("contacts after delete ", data);
      if (response.ok) {
        getContactsData();
        toast.success("Contact Deleted");
      } else {
        toast.error("Contact Not Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getContactsData();
  }, []);
  return (
    <>
      <section className="admin-contacts-section">
        <h1>Admin Contact Data </h1>

        <div className="container admin-contact">
          {contactData.map((curContactData, index) => {
            const { username, email, message, _id } = curContactData;
            return (
              <div key={index}>
                <p>{username}</p>
                <p>{email}</p>
                <p>{message}</p>
                <button className="btn" onClick={() => deleteContactById(_id)}>
                  delete
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default AdminContact;
