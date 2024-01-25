// Map through all messages to display on page

import { useState } from "react";
import { useSelector } from "react-redux";

export const MessageInput = () => {
  const [message, setMessage] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setMessage("");
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  return (
    <>
      <div className="messageInput">
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="message-text">
            <input
              type="text"
              name="message-text"
              value={message}
              disabled={!userInfo ? true : false}
              placeholder={!userInfo ? "Please sign in to create message" : ""}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <button type="submit" disabled={!userInfo}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
