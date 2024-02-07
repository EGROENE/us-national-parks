import { useEffect, useState } from "react";
import { TQuizQuestion } from "../../../types";
import { shuffleQuizAnswersArray } from "../../../methods";
import { quizBackgroundImages } from "../../../constants";

const QuizQuestion = ({
  question,
  questionIndex,
  setQuestionIndex,
  score,
  setScore,
  quizLength,
}: {
  question: TQuizQuestion | undefined;
  questionIndex: number;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  quizLength: number | undefined;
}) => {
  const [questionAnswered, setQuestionAnswered] = useState<boolean>(false);
  const [randomizedAnswers, setRandomizedAnswers] = useState<
    [string, string][] | undefined
  >();
  const [selectedAnswer, setSelectedAnswer] = useState<[string, string]>(["", ""]);

  const setBackgroundImage = () => {
    const randNum = Math.floor(Math.random() * quizBackgroundImages.length);
    document.body.style.backgroundImage = `url(${quizBackgroundImages[randNum]})`;
  };

  useEffect(() => {
    setBackgroundImage();
    setQuestionAnswered(false);
    setSelectedAnswer(["", ""]);
    if (question) {
      setRandomizedAnswers(shuffleQuizAnswersArray(Object.entries(question.answers)));
    }
  }, [question]);

  const handleAnswer = (answer: [string, string]): void => {
    setQuestionAnswered(true);
    setSelectedAnswer(answer);
    if (answer[0] === "rightAnswer") {
      setScore(score + 1);
    }
  };

  const answerClass = (
    answer: [string, string]
  ): "answer correct" | "answer incorrect" | "answer" => {
    if (questionAnswered) {
      if (answer[0] === "rightAnswer") {
        return "answer correct";
      } else if (answer[0] !== "rightAnswer" && answer === selectedAnswer) {
        return "answer incorrect";
      }
    }
    return "answer";
  };

  return (
    <div className="quiz-question">
      <header>{question?.question}</header>
      <div className="quiz-questions-container">
        {randomizedAnswers?.map((answer: [string, string]) => (
          <button
            disabled={questionAnswered}
            className={answerClass(answer)}
            key={answer[0]}
            onClick={() => handleAnswer(answer)}
          >
            {answer[1]}
          </button>
        ))}
      </div>
      {questionAnswered && question?.comment}
      <div className="quiz-nav-btns-container">
        <button onClick={() => window.location.reload()}>Restart Quiz</button>
        <button
          disabled={!questionAnswered}
          onClick={() => setQuestionIndex(questionIndex + 1)}
        >
          {quizLength && questionIndex < quizLength - 1
            ? "Next Question"
            : "See Results!"}
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;
