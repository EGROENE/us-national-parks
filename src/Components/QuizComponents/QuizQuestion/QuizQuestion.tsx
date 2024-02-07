import { TQuizQuestion } from "../../../types";

import { shuffleQuizAnswersArray } from "../../../methods";

const QuizQuestion = ({
  question,
  questionIndex,
  setQuestionIndex,
  score,
  setScore,
}: {
  question: TQuizQuestion | undefined;
  questionIndex: number;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}) => {
  // randomize order of question's answers:
  let randomizedAnswers: [string, string][] | undefined;
  if (question) {
    randomizedAnswers = shuffleQuizAnswersArray(Object.entries(question.answers));
  }

  const handleAnswer = (answer: [string, string]): void => {
    setQuestionIndex(questionIndex + 1);
    if (answer[0] === "rightAnswer") {
      setScore(score + 1);
    }
  };

  return (
    <>
      <h1>{question?.question}</h1>
      <div className="quiz-questions-container">
        {randomizedAnswers?.map((answer: [string, string]) => (
          <button key={answer[0]} onClick={() => handleAnswer(answer)}>
            {answer[1]}
          </button>
        ))}
      </div>
    </>
  );
};

export default QuizQuestion;
