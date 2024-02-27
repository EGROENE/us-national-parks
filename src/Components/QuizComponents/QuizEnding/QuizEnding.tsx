import { Link } from "react-router-dom";
import { useQuizContext } from "../../../Hooks/useQuizContext";

const QuizEnding = () => {
  const { score, resetQuiz, currentQuestions } = useQuizContext();
  const quizLength = currentQuestions?.length;

  let feedback: string = "Abysmal.";
  if (score && quizLength) {
    const finalScore = score / quizLength;
    switch (true) {
      case finalScore === 1:
        feedback = "Perfect score! You must be really smart.";
        break;
      case finalScore < 1 && finalScore >= 0.9:
        feedback = "Pretty good!";
        break;
      case finalScore < 0.9 && finalScore >= 0.75:
        feedback = "Not bad!";
        break;
      case finalScore < 0.75 && finalScore >= 0.5:
        feedback = "Could be better.";
        break;
      case finalScore < 0.5 && finalScore >= 0.2:
        feedback = "You have some studying to do.";
        break;
      // no default needed, as feedback is already initialized to a default before this 'switch' statement
    }
  }

  return (
    <div className="quiz-ending">
      <h1>Thanks for playing the quiz! Your final score is:</h1>
      <h2>{`${score} / ${quizLength}`}</h2>
      <p>{feedback}</p>
      <div className="quiz-end-btns-container">
        <Link to="/">
          <button onClick={() => resetQuiz()}>Back to Homepage</button>
        </Link>
        <button onClick={() => resetQuiz()}>Play Again!</button>
      </div>
    </div>
  );
};
export default QuizEnding;
