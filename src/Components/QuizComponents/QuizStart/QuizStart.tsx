const QuizStart = ({
  setTotalQuestionsSelected,
}: {
  setTotalQuestionsSelected: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
  return (
    <div className="quiz-start">
      <h1>Ready to test your knowledge on U.S. National Parks?</h1>
      <h2>Select a number of questions to play & let's get started!</h2>
      <div className="quiz-start-btns-container">
        <button onClick={() => setTotalQuestionsSelected(15)}>15</button>
        <button onClick={() => setTotalQuestionsSelected(30)}>30</button>
      </div>
    </div>
  );
};

export default QuizStart;
