// Components:
import { useState } from "react";
import { NavBar } from "../../NavBar/NavBar";
import QuizStart from "../QuizStart/QuizStart";

// Constants:
import { quizQuestions } from "../../../constants";

// Methods:
import { shuffleQuestionsArray } from "../../../methods";

// Types:
import { TQuizQuestion } from "../../../types";
import QuizQuestion from "../QuizQuestion/QuizQuestion";
import QuizEnding from "../QuizEnding/QuizEnding";

export const QuizMain = () => {
  const [totalQuestions, setTotalQuestions] = useState<number | undefined>();
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const randomizedQuestions = shuffleQuestionsArray(quizQuestions);

  const currentQuestions: TQuizQuestion[] = randomizedQuestions.filter(
    (question) => totalQuestions && randomizedQuestions.indexOf(question) < totalQuestions
  );
  const quizLength = currentQuestions.length;

  // Variables pertaining to logic that determines parts of quiz that should render (done to make return statement more readable):
  const quizNotStarted: boolean = !quizLength;
  const quizIsOver: boolean = quizLength > 0 && questionIndex + 1 > quizLength;
  const quizBegunAndNotFinished: boolean = quizLength > 0 && !quizIsOver;

  return (
    <>
      <NavBar notOnHomepage={true} notOnQuizPage={false} />
      {quizNotStarted && <QuizStart setTotalQuestions={setTotalQuestions} />}
      {quizBegunAndNotFinished && (
        <QuizQuestion
          question={currentQuestions[questionIndex]}
          questionIndex={questionIndex}
          setQuestionIndex={setQuestionIndex}
          score={score}
          setScore={setScore}
        />
      )}
      {quizIsOver && <QuizEnding finalScore={score / quizLength} />}
    </>
  );
};
