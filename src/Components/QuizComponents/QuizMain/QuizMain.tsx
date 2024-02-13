import "../quiz.css";

import { useQuizContext } from "../../../Hooks/useQuizContext";

// Components:
import NavBar from "../../VersatileComponents/NavBar/NavBar";
import QuizStart from "../QuizStart/QuizStart";
import QuizQuestion from "../QuizQuestion/QuizQuestion";
import QuizEnding from "../QuizEnding/QuizEnding";

const QuizMain = () => {
  const { quizLength, currentQuestions, questionIndex } = useQuizContext();

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
      {quizNotStarted && <QuizStart />}
      {quizBegunAndNotFinished && (
        <QuizQuestion question={currentQuestions && currentQuestions[questionIndex]} />
      )}
      {quizIsOver && <QuizEnding />}
    </>
  );
};
export default QuizMain;
