import { useEffect, useState } from "react";
import "../quiz.css";

// Components:
import NavBar from "../../NavBar/NavBar";
import QuizStart from "../QuizStart/QuizStart";

// Constants:
import { quizQuestions } from "../../../constants";

// Methods:
import { shuffleQuestionsArray } from "../../../methods";

// Types:
import { TQuizQuestion } from "../../../types";
import QuizQuestion from "../QuizQuestion/QuizQuestion";
import QuizEnding from "../QuizEnding/QuizEnding";

const QuizMain = () => {
  const [totalQuestionsSelected, setTotalQuestionsSelected] = useState<
    number | undefined
  >();
  const [currentQuestions, setCurrentQuestions] = useState<TQuizQuestion[] | undefined>();
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const randomizedQuestions = shuffleQuestionsArray(quizQuestions);
    setCurrentQuestions(
      randomizedQuestions.filter(
        (question) =>
          totalQuestionsSelected &&
          randomizedQuestions.indexOf(question) < totalQuestionsSelected
      )
    );
  }, [totalQuestionsSelected]);
  const quizLength = currentQuestions?.length;

  // Variables pertaining to logic that determines parts of quiz that should render (done to make return statement more readable):
  const quizNotStarted: boolean = !quizLength;
  let quizIsOver: boolean = false;
  let quizBegunAndNotFinished: boolean = false;
  if (quizLength) {
    quizIsOver = quizLength > 0 && questionIndex + 1 > quizLength;
    quizBegunAndNotFinished = quizLength > 0 && !quizIsOver;
  }

  return (
    <>
      <NavBar notOnHomepage={true} notOnQuizPage={false} />
      {quizNotStarted && (
        <QuizStart setTotalQuestionsSelected={setTotalQuestionsSelected} />
      )}
      {quizBegunAndNotFinished && (
        <QuizQuestion
          question={currentQuestions && currentQuestions[questionIndex]}
          questionIndex={questionIndex}
          setQuestionIndex={setQuestionIndex}
          score={score}
          setScore={setScore}
          quizLength={quizLength}
        />
      )}
      {quizIsOver && <QuizEnding finalScore={quizLength && score / quizLength} />}
    </>
  );
};
export default QuizMain;
