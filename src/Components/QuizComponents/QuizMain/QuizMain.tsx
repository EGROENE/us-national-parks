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

export const QuizMain = () => {
  const [quizLength, setQuizLength] = useState<number | undefined>();
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const randomizedQuestions = shuffleQuestionsArray(quizQuestions);

  const currentQuestions: TQuizQuestion[] = randomizedQuestions.filter(
    (question) => quizLength && randomizedQuestions.indexOf(question) < quizLength
  );

  // Variables pertaining to logic that determines parts of quiz that should render (done to simplify return statement below):
  const quizNotStarted: boolean = !quizLength;
  const quizIsOver: boolean = questionIndex > currentQuestions.length - 1;
  const quizBegunAndNotFinished: boolean = quizLength !== undefined && !quizIsOver;

  return (
    <>
      <NavBar notOnHomepage={true} notOnQuizPage={false} />
      {quizNotStarted && <QuizStart setQuizLength={setQuizLength} />}
      {quizBegunAndNotFinished && (
        <QuizQuestion
          question={currentQuestions[questionIndex]}
          questionIndex={questionIndex}
          setQuestionIndex={setQuestionIndex}
          score={score}
          setScore={setScore}
        />
      )}
      {/* render <QuizEnding /> when quizIsOver */}
    </>
  );
};
