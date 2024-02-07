import { Link } from "react-router-dom";

const QuizEnding = ({ finalScore }: { finalScore: number }) => {
  let feedback: string = "";
  switch (true) {
    case finalScore === 1:
      feedback = "Perfect score! You must be really smart.";
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
    default:
      feedback = "Abysmal.";
  }
  return (
    <>
      <h1>Thanks for playing the quiz! Your final score is:</h1>
      <h2>{`${(finalScore * 100).toFixed(2)}%`}</h2>
      <p>{feedback}</p>
      <button onClick={() => window.location.reload()}>Play Again!</button>
      <Link to="/">
        <button>Back to Homepage</button>
      </Link>
    </>
  );
};
export default QuizEnding;
