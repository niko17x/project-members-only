import { toast } from "react-toastify";
import { useFetchUsers } from "../hooks/useFetchUsers";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const AdminScreen = () => {
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

  const handleEdit = async (e, userId) => {
    e.preventDefault();
    navigate(`/selected-profile/${userId}`);
  };

  return (
    <>
      <div className="adminScreen">
        <h1>Hello, Admin</h1>
        <ul>
          {users
            .filter((user) => user._id !== userInfo?._id)
            .map((user) => (
              <form action="" key={user._id}>
                <li>{`ID: ${user._id}`}</li>
                <label htmlFor="">
                  Name:{" "}
                  <input type="text" defaultValue={user.name} readOnly={true} />
                </label>
                <label htmlFor="">
                  Email:{" "}
                  <input
                    type="email"
                    defaultValue={user.email}
                    readOnly={true}
                  />
                </label>
                <label htmlFor="">
                  Member:{" "}
                  <input
                    type="text"
                    defaultValue={user.member}
                    readOnly={true}
                  />
                </label>
                <Link to={`/profile/${user._id}`}>
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
