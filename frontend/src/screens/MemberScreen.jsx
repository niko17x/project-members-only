import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const MemberScreen = () => {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState();

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!answer) {
      toast.error("Field must not be empty");
      return;
    }

    try {
      const response = await fetch("/api/member-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer }),
      });

      const data = await response.json();
      data.answer ? setIsCorrect(true) : setIsCorrect(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="memberScreen">
      <h1>Become a Member</h1>
      <form action="" onSubmit={handleSubmit}>
        <p>Who developed E=mc^2?</p>
        <label htmlFor="member-question">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
      {isCorrect && <div>Secret code is: member2024</div>}
    </div>
  );
};
