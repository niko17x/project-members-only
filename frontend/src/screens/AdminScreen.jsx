import { toast } from "react-toastify";
import { useFetchUsers } from "../hooks/useFetchUsers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const AdminScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [member, setMember] = useState(Boolean);

  const { users, setUsers } = useFetchUsers();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleDelete = async (e, userId) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
      toast.success(`${userId} has been successfully deleted`);
    } catch (err) {
      toast.error("Could not delete user");
      console.error(err);
    }
  };

  // * ATM: Clicking on update retrieves correct user data.

  const handleEdit = async (e, userId) => {
    e.preventDefault();
    // !
    const response = await fetch("/api/users/all-users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    const result = data.find((user) => user._id === userId);

    try {
      const response = await fetch(`/api/users/selected-profile/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log(data);
      navigate(`/selected-profile/${userId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="adminScreen">
        <h1>Admin</h1>
        <ul>
          {users.map((user) => (
            <form action="" key={user._id}>
              <li>{`ID: ${user._id}`}</li>
              <label htmlFor="">
                Name:{" "}
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label htmlFor="">
                Email:{" "}
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label htmlFor="">
                Member:{" "}
                <input
                  type="text"
                  value={user.member}
                  onChange={(e) => setMember(e.target.value)}
                />
              </label>
              <Link to={`/profile/${user._id}`}>
                {/* <button
                  type="submit"
                  className="edit btn"
                  onClick={(e) => handleEdit(e, user._id)}
                >
                  Edit
                </button> */}
                <div onClick={(e) => handleEdit(e, user._id)}>Edit</div>
              </Link>
              <button
                className="submit btn"
                onClick={(e) => handleDelete(e, user._id)}
              >
                Delete
              </button>
            </form>
          ))}
        </ul>
      </div>
    </>
  );
};
