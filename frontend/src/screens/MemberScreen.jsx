import { useState } from "react";
import { toast } from "react-toastify";

export const MemberScreen = () => {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState();

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

      console.log(data.answer);

      if (data.answer) {
        setIsCorrect(true);
      }
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

// TODO: User submits correct answer => Success message provided => authenticated user becomes member automatically => member code is provided on screen.
