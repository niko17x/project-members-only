import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Fetch users w/ member status
export const useFetchMember = () => {
  const [isMember, setIsMember] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch("/api/users/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setIsMember(data.member);
      } catch (err) {
        console.error(err);
      }
    };
    userInfo && fetchMember();
  });
  return { isMember };
};
