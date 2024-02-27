import "../quiz.css";

import { useQuizContext } from "../../../Hooks/useQuizContext";

// Components:
import NavBar from "../../VersatileComponents/NavBar/NavBar";
import QuizStart from "../QuizStart/QuizStart";
import QuizQuestion from "../QuizQuestion/QuizQuestion";
import QuizEnding from "../QuizEnding/QuizEnding";

const QuizMain = () => {
  const { currentQuestions, questionIndex } = useQuizContext();
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
    <div className="quiz-container">
      <NavBar notOnHomepage={true} notOnQuizPage={false} />
      <div className="quiz-content-container">
        {quizNotStarted && <QuizStart />}
        {quizBegunAndNotFinished && (
          <QuizQuestion question={currentQuestions && currentQuestions[questionIndex]} />
        )}
        {quizIsOver && <QuizEnding />}
      </div>
    </div>
  );
};
export default QuizMain;
