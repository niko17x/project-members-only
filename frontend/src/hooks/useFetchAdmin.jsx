import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useFetchAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(null); // Initialize with null
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch("/api/users/profile");
        const data = await response.json();
        setIsAdmin(data.admin); // Assuming the response has an isAdmin property
      } catch (err) {
        console.error(err);
      }
    };

    if (userInfo) {
      fetchAdmin();
    }
  }, [userInfo]); // Dependency on userInfo

  return { isAdmin };
};
