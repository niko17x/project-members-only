import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const toastId = "success";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users/all-users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUsers(data);

        if (!toast.isActive(toastId)) {
          toast.success("Users successfully loaded", {
            toastId: toastId,
          });
        }
      } catch (err) {
        toast.error("Error fetching users");
        console.error(err);
      }
    };
    fetchUsers();
  }, []);
  return { users, setUsers };
};
