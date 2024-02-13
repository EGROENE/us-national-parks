import { useEffect } from "react";
import { TQuizQuestion } from "../../../types";
import { shuffleQuizAnswersArray } from "../../../methods";
import { quizBackgroundImages } from "../../../constants";
import { useQuizContext } from "../../../Hooks/useQuizContext";

const QuizQuestion = ({ question }: { question: TQuizQuestion | undefined }) => {
  const {
    setQuestionAnswered,
    setSelectedAnswer,
    setRandomizedAnswers,
    setScore,
    score,
    questionAnswered,
    selectedAnswer,
    questionIndex,
    randomizedAnswers,
    setQuestionIndex,
    quizLength,
    resetQuiz,
  } = useQuizContext();

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
  }, [question, setQuestionAnswered, setRandomizedAnswers, setSelectedAnswer]);

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
      <header>{`${questionIndex + 1} / ${quizLength}`}</header>
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
        <button onClick={() => resetQuiz()}>Restart Quiz</button>
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
