import { useEffect, useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

export default function QuizPage() {
  const questions: Question[] = [
    {
      question: "Who won IPL 2024?",
      options: ["CSK", "KKR", "RCB", "MI"],
      answer: "KKR",
    },
    {
      question: "Who is called King Kohli?",
      options: ["Rohit", "Virat Kohli", "Dhoni", "Gill"],
      answer: "Virat Kohli",
    },
    {
      question: "How many players in cricket team?",
      options: ["10", "11", "12", "9"],
      answer: "11",
    },
    {
      question: "Who is captain of India?",
      options: ["Dhoni", "Rohit Sharma", "Kohli", "Rahul"],
      answer: "Rohit Sharma",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const playSound = (type: "correct" | "wrong") => {
    const audio = new Audio(
      type === "correct" ? "/correct.mp3" : "/wrong.mp3"
    );
    audio.volume = 1;
    audio.play().catch((err) => console.log(err));
  };

  const handleAnswer = (option: string) => {
    if (answered) return;

    setSelected(option);
    setAnswered(true);

    if (option === questions[current].answer) {
      setScore(score + 1);
      playSound("correct");
    } else {
      playSound("wrong");
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected("");
        setAnswered(false);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelected("");
    setAnswered(false);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md text-center shadow-2xl">
          <h1 className="text-4xl font-bold mb-4">Quiz Finished 🎉</h1>
          <p className="text-xl mb-6">
            Your Score: {score} / {questions.length}
          </p>

          <button
            onClick={restartQuiz}
            className="w-full py-3 rounded-2xl bg-green-500 hover:bg-green-600 font-bold text-lg"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white px-4 py-8 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-4">🏏 Quiz</h1>

        <div className="mb-4 text-center text-sm text-zinc-300">
          Question {current + 1} / {questions.length}
        </div>

        <h2 className="text-xl font-semibold mb-6 text-center">
          {q.question}
        </h2>

        <div className="space-y-3">
          {q.options.map((option, index) => {
            let btnColor =
              "bg-white/10 hover:bg-white/20 border border-white/10";

            if (answered) {
              if (option === q.answer) {
                btnColor = "bg-green-500";
              } else if (
                option === selected &&
                option !== q.answer
              ) {
                btnColor = "bg-red-500";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full py-3 rounded-2xl font-semibold transition-all ${btnColor}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="mt-6 text-center text-lg font-bold text-yellow-400">
          Score: {score}
        </div>
      </div>
    </div>
  );
}