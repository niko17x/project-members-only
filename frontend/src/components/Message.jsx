// Map through all messages to display on page
import { useEffect, useState } from "react";
import { MessageInput } from "./MessageInput";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const Message = () => {
  const [messages, setMessages] = useState([]);
  const [isAdmin, setIsAdmin] = useState("");

  // ? How does this work
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          userInfo ? "/api/messages" : "/api/messages/public-access"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const updatedData = await response.json();
        setMessages(updatedData);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchData();
  }, [userInfo, messages]);

  useEffect(() => {
    setIsAdmin(userInfo?.admin || false);
  }, [userInfo?.admin]);

  const handleDeleteBtn = async (messageId) => {
    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      console.log("Message deleted");
      toast.success("Message successfully deleted");

      // Update the local state to reflect the deletion
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="message-container">
        <ul className="message-ul">
          {messages.map((message) => (
            <li key={message._id}>
              {(userInfo && userInfo._id === message.userId) || isAdmin ? (
                <button
                  className="delete-btn"
                  id={message._id}
                  onClick={() => handleDeleteBtn(message._id)}
                >
                  &#10006;
                </button>
              ) : (
                ""
              )}
              <p className="message-text">{message.text}</p>
              <p className="message-created st">
                {userInfo &&
                  `Posted:
                  ${new Date(message.createdAt).toLocaleString()}`}
              </p>
              <p className="message-username st">
                {userInfo && `User: ${message.username || "Secret"}`}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <MessageInput />
    </>
  );
};
